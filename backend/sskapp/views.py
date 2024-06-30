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
'''    '''
'''class reporte(APIView):
    def get(self, request,id_tablaClasificacion):
        tablaClasificacion_pdf = tablaClasificacion.objects.get(id_tablaClasificacion=id_tablaClasificacion)
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="Tabla de clasificaciones: {tablaClasificacion_pdf.id_tablaClasificacion}.pdf"'
        pdf = canvas.Canvas(response)
        pdf.drawString(100, 800, f'Id de la tabla: {tablaClasificacion_pdf.id_tablaClasificacion}')
        pdf.drawString(100, 780, f'Nombre del cliente competitivo: {tablaClasificacion_pdf.nombre_clienteCompetitivo}')
        pdf.drawString(100, 760, f'Apellido del cliente competitivo: {tablaClasificacio_pdf.apellido_clienteCompetitivo}')
        pdf.drawString(100, 740, f'Tiempo de vuelta mas rapida: {tablaClasificacio_pdf.tiempoVueltaMasRapida}')
        pdf.drawString(100, 740, f'Identificacion del usuario competitivo: {tablaClasificacio_pdf.id_competitivo}')
        pdf.showPage()
        pdf.save()
        return response
    '''

#esta para sacar todos los reportes y ordenarlosssssss
class ReporteClasificacion(APIView):
    def get(self, request, *args, **kwargs):
        # Obtener todos los registros de la tabla, ordenados por el tiempo de vuelta más rápida
        tablas_clasificacion = tablaClasificacion.objects.all().order_by('tiempoVueltaMasRapida')
        
        # Configurar la respuesta HTTP para un archivo PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="Tabla_de_clasificaciones.pdf"'
        
        # Crear un objeto PDF
        pdf = canvas.Canvas(response)
        
        # Variables para controlar la posición en el PDF
        y_position = 800  # Posición Y inicial
        x_position = 100  # Posición X fija
        
        # Iterar sobre todos los registros y agregarlos al PDF
        for tabla in tablas_clasificacion:
            pdf.drawString(x_position, y_position, f'Id de la tabla: {tabla.id}')
            y_position -= 20
            pdf.drawString(x_position, y_position, f'Nombre del cliente competitivo: {tabla.nombre_clienteCompetitivo}')
            y_position -= 20
            pdf.drawString(x_position, y_position, f'Apellido del cliente competitivo: {tabla.apellido_clienteCompetitivo}')
            y_position -= 20
            pdf.drawString(x_position, y_position, f'Tiempo de vuelta más rápida: {tabla.tiempoVueltaMasRapida}')
            y_position -= 20
            pdf.drawString(x_position, y_position, f'Identificación del usuario competitivo: {tabla.id_competitivo}')
            y_position -= 40  # Espacio adicional entre registros
            
            # Si la posición Y está demasiado baja, agregar una nueva página
            if y_position < 100:
                pdf.showPage()
                y_position = 800  # Reiniciar la posición Y
        
        # Guardar y cerrar el PDF
        pdf.showPage()
        pdf.save()
        
        return response