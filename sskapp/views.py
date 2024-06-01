from django.shortcuts import render
from django.db import connection
from rest_framework import viewsets

# Create your views here.
from .models import kart, usuario, clienteCompetitivo, clienteCasual, tablaClasificacion
from .serializers import kartSerializer, usuarioSerializer, clienteCompetitivoSerializer, clienteCasualSerializer, tablaClasificacionSerializer

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

class tablaClasificacionViewSet(viewsets.ModelViewSet): #Crear un viewset para cada tabla
    queryset = tablaClasificacion.objects.all()
    serializer_class = tablaClasificacionSerializer
