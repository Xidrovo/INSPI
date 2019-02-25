from django.db import migrations

def anadirTablaRAM(apps, schema_editor):
	TipoDeDato_model = apps.get_model('api', 'TipoDeDato')
	tabla_ram = TipoDeDato_model.objects.get(pk='tabla_ram')
	tabla_ram.detalle = '{"COLUMNAS" : {"DIFUSIÓN DE DISCO- KIRBY BAUER" : ["Carga del disco", "Diámetro del Halo(mm)", "Interpretación"],"MICRODILUCIÓN EN CALDO" : ["CIM (μg/ml) ", "Interpretación"]},"FILAS" : {"NOMBRE DEL ANTIBIOTICO" : ["Meropenem", "Ceftazidima", "Aztreonam", "Ciprofloxacina", "Colistín", "*"]}}'
	tabla_ram.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_seeder_plantillas'),
    ]

    operations = [
    	migrations.RunPython(anadirTablaRAM),
    ]