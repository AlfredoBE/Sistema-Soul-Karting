from django.db import models

class kart(models.Model):
    id_kart= models.IntegerField(primary_key=True)
    estado_kart= models.CharField(max_length=30)

class usuario(models.Model):
    id_usuario=models.IntegerField(primary_key=True)
    nombre_usuario=models.CharField(max_length=30)
    password_usuario=models.CharField(max_length=20)
    rol_usuario=models.CharField(max_length=15)

class clienteCompetitivo(models.Model):
    id_competitivo= models.IntegerField(primary_key=True)
    nombre_competitivo= models.CharField(max_length=30,default='John')
    apellido_competitivo=models.CharField(max_length=30, default='Doe')
    rut_competitivo=models.IntegerField()
    plan_competitivo=models.CharField(max_length=20)
    vueltas_disponibles=models.IntegerField(default=0)
    fechaRegistro_competitivo=models.DateField()
    estado_competitivo=models.CharField(max_length=30)
    id_usuario=models.ForeignKey(usuario, on_delete=models.PROTECT)
    id_kart=models.ForeignKey(kart, on_delete=models.PROTECT)

class clienteCasual(models.Model):
    id_casual=models.IntegerField(primary_key=True)
    nombre_casual=models.CharField(max_length=30, default='John')   
    apellidoCasual=models.CharField(max_length=30,default='Doe')   
    rut_casual=models.IntegerField()
    plan_casual=models.CharField(max_length=20)
    tiempo_disponible=models.TimeField()
    fechaRegistro_casual=models.DateField()
    estado_casual=models.CharField(max_length=30)
    id_usuario=models.ForeignKey(usuario, on_delete=models.PROTECT)
    id_kart=models.ForeignKey(kart, on_delete=models.PROTECT)

class tablaClasificacion(models.Model):
    id_tablaClasificacion=models.IntegerField(primary_key=True)
    nombre_clienteCompetitivo=models.CharField(max_length=30, default= 'John')
    apellido_clienteCompetitivo=models.CharField(max_length=30, default= 'Doe')
    tiempoVueltaMasRapida=models.TimeField()
    id_competitivo=models.ForeignKey(clienteCompetitivo, on_delete=models.PROTECT)