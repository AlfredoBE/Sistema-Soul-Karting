from django.shortcuts import render
from django.db import connection
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import kart, usuario, clienteCompetitivo, clienteCasual, tablaClasificacion
from .serializers import kartSerializer, usuarioSerializer, clienteCompetitivoSerializer, clienteCasualSerializer, tablaClasificacionSerializer, loginSerializer
from reportlab.pdfgen import canvas
from django.http import HttpResponse

class clienteCompetitivoViewSet(viewsets.ModelViewSet): #Crear un viewset para cada tabla
    queryset = clienteCompetitivo.objects.all()
    serializer_class = clienteCompetitivoSerializer

class clienteCasualViewSet(viewsets.ModelViewSet): #Crear un viewset para cada tabla
    queryset = clienteCasual.objects.all()
    serializer_class = clienteCasualSerializer

class usuarioViewSet(viewsets.ModelViewSet): #Crear un viewset para cada tabla
    queryset = usuario.objects.all()
    serializer_class = usuarioSerializer

class kartViewSet(viewsets.ModelViewSet): #Crear un viewset para cada tabla
    queryset = kart.objects.all()
    serializer_class = kartSerializer

class tablaClasificacionViewSet(viewsets.ModelViewSet):
    queryset = tablaClasificacion.objects.all()
    serializer_class = tablaClasificacionSerializer

'''class permisosUsuario(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in ('GET', 'PUT', 'DELETE')
    
class tablaClasificacionViewSet(viewsets.ModelViewSet): #Crear un viewset para cada tabla
    queryset = tablaClasificacion.objects.all()
    permission_classes=[permisosUsuario]
    serializer_class = tablaClasificacionSerializer
    '''
#------------------------------------------------------------------------------------------#
class Login(APIView):
    def post(self, request):
        serializer = loginSerializer(data=request.data)
        
        if serializer.is_valid():
            l_nombre_usuario = serializer.validated_data['nombre_usuario']
            l_password_usuario = serializer.validated_data['password_usuario']
            
            # Buscar un usuario en la base de datos con las credenciales proporcionadas
            try:
                user = usuario.objects.get(mail_usuario=l_nombre_usuario, password_usuario = l_password_usuario)
            except usuario.DoesNotExist:
                user = None

            if user is not None:
                # El usuario es válido
                rol_usuario = user.rol_usuario
                return Response({'message': 'Inicio de sesión exitoso '+ rol_usuario}, status=status.HTTP_200_OK)
            else:
                # Credenciales no válidas
                return Response({'message': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # Datos de solicitud no válidos
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#generacion de reporte pdf
#con esto se imprime el pdf http://127.0.0.1:8000/api/v1/tabla-clasificacion-pdf/
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib import colors


class TablaClasificacionPDFView(APIView):
    def get(self, request):
        # Obtener todos los registros de la tabla, ordenados por el tiempo de vuelta más rápida
        tablas_clasificacion = tablaClasificacion.objects.all().order_by('tiempoVueltaMasRapida')

        # Crear el documento PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="tabla_clasificacion.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elements = []

        # Título del documento
        titulo = Paragraph('Tabla de Clasificación', ParagraphStyle(name='TitleStyle', fontSize=18))

        # Agregar título al documento
        elements.append(titulo)
        elements.append(Paragraph('<br/><br/>', ParagraphStyle(name='TitleStyle', fontSize=12)))

        # Crear lista para datos de la tabla
        table_data = [
            ['Id Tabla', 'Nombre Cliente', 'Apellido Cliente', 'Tiempo de Vuelta Más Rápida']
        ]

        # Agregar datos de la tabla
        for tabla in tablas_clasificacion:
            row = [
                str(tabla.id_tablaClasificacion),
                tabla.nombre_clienteCompetitivo,
                tabla.apellido_clienteCompetitivo,
                str(tabla.tiempoVueltaMasRapida),
            ]
            table_data.append(row)

        # Crear la tabla
        table = Table(table_data)

        # Estilo de la tabla
        style = TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), (0.2, 0.4, 0.6)),  # Color de fondo para encabezado
            ('TEXTCOLOR', (0, 0), (-1, 0), (1, 1, 1)),  # Color de texto para encabezado
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),  # Alinear contenido al centro
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),  # Fuente en negrita para encabezado
            ('FONTSIZE', (0, 0), (-1, 0), 12),  # Tamaño de fuente para encabezado
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),  # Espacio inferior para encabezado
            ('BACKGROUND', (0, 1), (-1, -1), (0.9, 0.9, 0.9)),  # Color de fondo para filas alternas
            ('GRID', (0, 0), (-1, -1), 1, (0, 0, 0)),  # Estilo de la cuadrícula
        ])
        table.setStyle(style)

        # Agregar la tabla al documento PDF
        elements.append(table)

        # Construir el PDF
        doc.build(elements)

        return response