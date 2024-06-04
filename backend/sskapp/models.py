import random
from datetime import time
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
    id_competitivo= models.AutoField(primary_key=True)
    nombre_competitivo= models.CharField(max_length=30,default='John')
    apellido_competitivo=models.CharField(max_length=30, default='Doe')
    rut_competitivo=models.IntegerField()
    plan_competitivo=models.CharField(max_length=20)
    vueltas_disponibles=models.IntegerField(default=0)
    fechaRegistro_competitivo=models.DateField()
    estado_competitivo=models.CharField(max_length=30)
    id_usuario=models.ForeignKey(usuario, on_delete=models.PROTECT)
    id_kart=models.ForeignKey(kart, on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.nombre_competitivo} {self.apellido_competitivo}"

class clienteCasual(models.Model):
    id_casual=models.AutoField(primary_key=True)
    nombre_casual=models.CharField(max_length=30, default='John')   
    apellido_casual=models.CharField(max_length=30,default='Doe')   
    rut_casual=models.IntegerField()
    plan_casual=models.CharField(max_length=20)
    tiempo_disponible=models.IntegerField()
    fechaRegistro_casual=models.DateField()
    estado_casual=models.CharField(max_length=30)
    id_usuario=models.ForeignKey(usuario, on_delete=models.PROTECT)
    id_kart=models.ForeignKey(kart, on_delete=models.PROTECT)

class tablaClasificacion(models.Model):
    id_tablaClasificacion=models.AutoField(primary_key=True)
    nombre_clienteCompetitivo=models.CharField(max_length=30, default= 'John')
    apellido_clienteCompetitivo=models.CharField(max_length=30, default= 'Doe')
    tiempoVueltaMasRapida=models.TimeField()
    id_competitivo=models.ForeignKey(clienteCompetitivo, on_delete=models.PROTECT)

#-------------------------------------------------------------------------------------
    def save(self, *args, **kwargs):
        if not self.id_tablaClasificacion:  # Solo genera el tiempo aleatorio en la creacion, no en actualizaciones

            self.tiempoVueltaMasRapida = self.generate_random_time()
        
        if self.id_competitivo:
            self.nombre_clienteCompetitivo = self.id_competitivo.nombre_competitivo
            self.apellido_clienteCompetitivo = self.id_competitivo.apellido_competitivo

        super().save(*args, **kwargs)

    def generate_random_time(self):
        random_time = time(0, random.randint(1,3), random.randint(0,59))
        return random_time

    def __str__(self):
        return f"{self.nombre_clienteCompetitivo} {self.apellido_clienteCompetitivo}"