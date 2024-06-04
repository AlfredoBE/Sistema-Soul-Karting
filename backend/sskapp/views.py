from django.shortcuts import render
from django.db import connection
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import kart, usuario, clienteCompetitivo, clienteCasual, tablaClasificacion
from .serializers import kartSerializer, usuarioSerializer, clienteCompetitivoSerializer, clienteCasualSerializer, tablaClasificacionSerializer, loginSerializer

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