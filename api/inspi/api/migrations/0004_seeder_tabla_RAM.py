from django.db import migrations

def anadirTablaRAM(apps, schema_editor):
	TipoDeDato_model = apps.get_model('api', 'TipoDeDato')
	tabla_ram = TipoDeDato_model.objects.get(pk='tabla_ram')
	tabla_ram.detalle = '{"CABECERA" : ["KIRBY BAUER","MIC"],"SUBCABECERA" : ["Nombre del antibiotico","Carga","Marca","Lectura del disco (mm)","Interpretacion","Marca","Resultado (ug/mL)","Interpretacion"],"NOMBRE_ANTIBIOTICO" : ["Oxacilina","Penicilina","Eritromicina","Vancomicina","Sulf. + Trimetoprim","Cloranfenicol","Cetriaxona","Ampicilina","Rifampicina","Otros"]}'
	tabla_ram.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_seeder_plantillas'),
    ]

    operations = [
    	migrations.RunPython(anadirTablaRAM),
    ]
