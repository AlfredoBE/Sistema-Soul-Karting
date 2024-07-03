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

#reporte cliente casual y cliente competitivo
#para crear el reporte  http://127.0.0.1:8000/api/v1/clientes-pdf/
from io import BytesIO
import matplotlib.pyplot as plt
from PIL import Image as PILImage  # Asegúrate de importar Image de PIL
import io

from django.http import HttpResponse
from django.views.generic import View
from django.db.models import Count
from django.utils import timezone
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import navy, white
from reportlab.lib import colors
from reportlab.platypus import TableStyle
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

class ClientesPDFView(APIView):
    def get(self, request):
        # Obtener la cantidad de clientes casual
        cantidad_casual = clienteCasual.objects.all().count()

        # Obtener la cantidad de clientes competitivo
        cantidad_competitivo = clienteCompetitivo.objects.all().count()

        # Determinar el tipo de cliente más utilizado
        tipo_mas_utilizado = None
        if cantidad_casual > cantidad_competitivo:
            tipo_mas_utilizado = 'casual'
        elif cantidad_competitivo > cantidad_casual:
            tipo_mas_utilizado = 'competitivo'
        else:
            tipo_mas_utilizado = 'ambos tipos, los dos son escogidos en igual manera'

        # Crear el documento PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="clientes_tipo.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elements = []

        # Título del documento
        titulo = Paragraph('Clientes por Tipo', ParagraphStyle(name='TitleStyle', fontSize=18))

        # Agregar título al documento
        elements.append(titulo)
        elements.append(Spacer(1, 12))  # Espacio de 12 puntos después del título

        # Datos de cantidad de clientes
        data = [
            ['Tipo de Cliente', 'Cantidad'],
            ['Casual', cantidad_casual],
            ['Competitivo', cantidad_competitivo],
        ]

        # Crear la tabla
        table = Table(data)

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

        # Crear el gráfico circular
        fig, ax = plt.subplots(dpi=300)  # Aumentar la resolución del gráfico
        tipos_clientes = ['Casual', 'Competitivo']
        cantidades = [cantidad_casual, cantidad_competitivo]
        _, texts, autotexts = ax.pie(cantidades, labels=tipos_clientes, autopct='%1.1f%%', startangle=90)

        # Ajustar tamaño de las etiquetas
        for text in texts + autotexts:
            text.set_fontsize(15)

        ax.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

        # Guardar el gráfico en un buffer de bytes con mayor resolución
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', dpi=300)  # Aumentar la resolución a 300 dpi
        plt.close(fig)

        # Abrir la imagen con PIL y ajustar el tamaño
        img = PILImage.open(buffer)
        img_width, img_height = img.size
        aspect = img_height / float(img_width)
        desired_width = 4 * inch  # Ancho deseado de 4 pulgadas
        desired_height = (desired_width * aspect)
        img = img.resize((int(desired_width), int(desired_height)), PILImage.LANCZOS)

        # Guardar la imagen escalada en un nuevo buffer
        buffer = io.BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)

        # Crear una imagen de ReportLab a partir del buffer
        rl_img = RLImage(buffer, width=desired_width, height=desired_height)

        # Agregar espacio antes del gráfico circular
        elements.append(Spacer(1, 24))  # Espacio de 24 puntos antes del gráfico

        # Agregar el gráfico circular al PDF
        elements.append(Paragraph('Porcentaje de preferencia de carreras', ParagraphStyle(name='TitleStyle', fontSize=16, spaceBefore=20)))  # Espacio antes del título
        elements.append(Spacer(1, 12))  # Espacio de 12 puntos antes del gráfico
        elements.append(rl_img)

        # Agregar mensaje con el tipo de cliente más utilizado
        elements.append(Spacer(1, 24))  # Espacio de 24 puntos antes del mensaje
        elements.append(Paragraph(f' El tipo de plan de carrera más utilizado por los clientes corresponde a : {tipo_mas_utilizado}', ParagraphStyle(name='TitleStyle', fontSize=14)))

        # Construir el PDF
        doc.build(elements)

        return response


# instalar pillow   pip install Pillow
#instalar pandass pip install pandas
from reportlab.platypus import Image as RLImage
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
import pandas as pd
from reportlab.platypus import Image
# para llamarlo http://127.0.0.1:8000/api/v1/total-clientes-recurrentes/


#todos las librerias apelotanadasssssss

from django.db.models import Count
import matplotlib.pyplot as plt
import io
from PIL import Image
from io import BytesIO
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
import matplotlib
matplotlib.use('Agg')
from PIL import Image as PILImage 



import pandas as pd
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as ReportLabImage, Table, TableStyle, Image as RLImage, Image
from django.db.models import Count
import matplotlib.pyplot as plt
import io
from PIL import Image
from io import BytesIO
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image as RLImage
from reportlab.lib.units import inch
import matplotlib
matplotlib.use('Agg')
from PIL import Image as PILImage 

#------------------------------
import pandas as pd
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from reportlab.platypus import Image 

#-----------------------------from django.http import HttpResponse


import pandas as pd
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
 

import pandas as pd
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from reportlab.platypus import Image 






class TotalClientesRecurrentesPDFView(APIView):
    def get(self, request):
        # Obtener clientes casuales y competitivos con recurrencia para la tabla
        clientes_casual = clienteCasual.objects.values('nombre_casual', 'apellido_casual', 'rut_casual').annotate(repetidos=Count('rut_casual')).order_by('-repetidos')
        clientes_competitivo = clienteCompetitivo.objects.values('nombre_competitivo', 'apellido_competitivo', 'rut_competitivo').annotate(repetidos=Count('rut_competitivo')).order_by('-repetidos')

        # Obtener clientes casuales y competitivos con recurrencia para el gráfico
        clientes_casual_grafico = clienteCasual.objects.values('fechaRegistro_casual').annotate(repetidos=Count('id_casual')).order_by('fechaRegistro_casual')
        clientes_competitivo_grafico = clienteCompetitivo.objects.values('fechaRegistro_competitivo').annotate(repetidos=Count('id_competitivo')).order_by('fechaRegistro_competitivo')

        # Crear el documento PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="reporte-clientes-recurrentes.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elements = []

        # Crear gráfico de barras por mes para clientes casuales y competitivos
        fig, ax = plt.subplots(figsize=(10, 6))
        
        # Datos de clientes casuales por mes
        df_casual = pd.DataFrame(list(clientes_casual_grafico))
        df_casual['fechaRegistro_casual'] = pd.to_datetime(df_casual['fechaRegistro_casual'])
        df_casual['mes'] = df_casual['fechaRegistro_casual'].dt.strftime('%B %Y')
        df_casual_agrupado = df_casual.groupby('mes')['repetidos'].sum()

        # Datos de clientes competitivos por mes
        df_competitivo = pd.DataFrame(list(clientes_competitivo_grafico))
        df_competitivo['fechaRegistro_competitivo'] = pd.to_datetime(df_competitivo['fechaRegistro_competitivo'])
        df_competitivo['mes'] = df_competitivo['fechaRegistro_competitivo'].dt.strftime('%B %Y')
        df_competitivo_agrupado = df_competitivo.groupby('mes')['repetidos'].sum()

        # Unir datos de clientes casuales y competitivos por mes
        df_unido = pd.DataFrame({
            'Clientes Casuales': df_casual_agrupado,
            'Clientes Competitivos': df_competitivo_agrupado
        }).fillna(0)

        # Definir el orden cronológico de los meses
        df_unido.index = pd.to_datetime(df_unido.index, format='%B %Y')
        df_unido = df_unido.sort_index()

        # Crear gráfico de barras por mes
        df_unido.plot(kind='bar', stacked=True, ax=ax)
        ax.set_xlabel('Mes')
        ax.set_ylabel('Número de Clientes')
        ax.set_title('Número de Clientes Recurrentes por Mes')
        ax.legend()

        # Formatear etiquetas del eje x para mostrar solo el mes y el año
        ax.set_xticklabels(df_unido.index.strftime('%B %Y'))
        
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()

        # Guardar gráfico en BytesIO para incluir en el PDF
        buffer = BytesIO()
        canvas = FigureCanvas(fig)
        canvas.print_png(buffer)
        plt.close(fig)
        buffer.seek(0)

        # Agregar gráfico al documento PDF
        elements.append(Paragraph('Gráfico de Clientes Recurrentes por Mes', ParagraphStyle(name='TitleStyle', fontSize=16, spaceBefore=20)))  # Espacio antes del título
        elements.append(Spacer(1, 12))  # Espacio de 12 puntos antes del gráfico
        elements.append(Image(buffer, width=500, height=300))
        elements.append(Spacer(1, 24))  # Espacio de 24 puntos después del gráfico

        # Crear tablas para clientes casuales y competitivos
        data = [
            ['Cliente', 'Número de Repeticiones'],
        ]

        # Agregar datos de clientes casuales
        for cliente in clientes_casual:
            nombre_cliente = f"{cliente['nombre_casual']} {cliente['apellido_casual']}"
            data.append([
                nombre_cliente,
                cliente['repetidos']
            ])

        # Agregar datos de clientes competitivos
        for cliente in clientes_competitivo:
            nombre_cliente = f"{cliente['nombre_competitivo']} {cliente['apellido_competitivo']}"
            data.append([
                nombre_cliente,
                cliente['repetidos']
            ])

        # Crear la tabla para clientes casuales y competitivos
        table = Table(data)

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

        # Agregar tabla al documento PDF
        elements.append(Paragraph('Clientes Recurrentes', ParagraphStyle(name='TitleStyle', fontSize=16, spaceBefore=20)))  # Espacio antes del título
        elements.append(Spacer(1, 12))  # Espacio de 12 puntos antes de la tabla
        elements.append(table)

        # Construir el PDF con todos los elementos
        doc.build(elements)
        return response