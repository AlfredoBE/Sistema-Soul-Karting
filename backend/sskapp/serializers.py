from rest_framework import serializers
from .models import kart, usuario, clienteCompetitivo, clienteCasual, tablaClasificacion

class kartSerializer(serializers.ModelSerializer):
    class Meta:
        model = kart
        fields = '__all__'

class usuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuario
        fields = '__all__'

class clienteCompetitivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = clienteCompetitivo
        fields = '__all__'

class clienteCasualSerializer(serializers.ModelSerializer):
    class Meta:
        model = clienteCasual
        fields = '__all__'

class tablaClasificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = tablaClasificacion
        fields = '__all__'