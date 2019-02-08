from django.db import migrations

def anadirTablaBACT(apps, schema_editor):
	TipoDeDato_model = apps.get_model('api', 'TipoDeDato')
	tabla_bacteriologia = TipoDeDato_model.objects.get(pk='tabla_bacteriologia')
	tabla_bacteriologia.detalle = '{"FILAS" : {"NOMBRE DEL ANTIBIOTICO" : ["Oxacilina", "Penicilina", "Eritromicina", "Vancomicina", "Sulf. + Trimetoprim", "Cloranfenicol", "Ceftriaxona", "Ampicilina", "Rifampicina", "*Otros"]},"COLUMNAS" : {"KIRBY BAUER" : ["Carga", "Marca", "Lectura del disco(mm)", "Interpretación"],"MIC" : ["Marca", "Resultado(ug/mL)", "Interpretación"]}}'
	tabla_bacteriologia.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_vial'),
    ]

    operations = [
    	migrations.RunPython(anadirTablaBACT),
    ]
