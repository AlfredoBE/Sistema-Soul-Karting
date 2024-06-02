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

'''class tablaClasificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = tablaClasificacion
        fields = '__all__'
'''

class tablaClasificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = tablaClasificacion
        fields = ['id_tablaClasificacion', 'nombre_clienteCompetitivo', 'apellido_clienteCompetitivo', 'tiempoVueltaMasRapida', 'id_competitivo']
        read_only_fields = ['id_tablaClasificacion', 'nombre_clienteCompetitivo', 'apellido_clienteCompetitivo', 'tiempoVueltaMasRapida']

class loginSerializer(serializers.Serializer):
    nombre_usuario = serializers.CharField(max_length=30)
    password_usuario = serializers.CharField(max_length=20)