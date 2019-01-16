from django.db import migrations

def anadirTablaRAM(apps, schema_editor):
	TipoDeDato_model = apps.get_model('api', 'TipoDeDato')
	tabla_ram = TipoDeDato_model.objects.get(pk='tabla_ram')
	tabla_ram.detalle = '{"FILAS" : {"NOMBRE DEL ANTIBIOTICO" : ["Oxacilina", "Penicilina", "Eritromicina", "Vancomicina", "Sulf. + Trimetoprim", "Cloranfenicol", "Ceftriaxona", "Ampicilina", "Rifampicina", "*Otros"]},"COLUMNAS" : {"KIRBY BAUER" : ["Carga", "Marca", "Lectura del disco(mm)", "Interpretación"],"MIC" : ["Marca", "Resultado(ug/mL)", "Interpretación"]}}'
	tabla_ram.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_seeder_plantillas'),
    ]

    operations = [
    	migrations.RunPython(anadirTablaRAM),
    ]
