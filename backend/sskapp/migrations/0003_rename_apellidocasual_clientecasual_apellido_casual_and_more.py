# Generated by Django 5.0.6 on 2024-06-03 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sskapp', '0002_alter_clientecasual_id_casual_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='clientecasual',
            old_name='apellidoCasual',
            new_name='apellido_casual',
        ),
        migrations.AlterField(
            model_name='clientecasual',
            name='tiempo_disponible',
            field=models.IntegerField(),
        ),
    ]