from django.db import migrations

def anadirTablaBACT(apps, schema_editor):
	TipoDeDato_model = apps.get_model('api', 'TipoDeDato')
	tabla_bacteriologia = TipoDeDato_model.objects.get(pk='tabla_bacteriologia')
	tabla_bacteriologia.detalle = '{"COLUMNAS" : [{"cabecera": "KIRBY BAUER","cant_columnas": 4,"campos": ["CARGA", "MARCA", "LECTURA DEL DISCO (mm)", "INTERPRETACION"]},{"cabecera": "MIC","cant_columnas": 3,"campos": ["MARCA", "RESULTADO (ug/mL)", "INTERPRETACION"]}],"FILAS" : {"cabecera": "NOMBRE DEL ANTIBIOTICO","campos": ["OXACILINA", "PENICILINA", "ERITROMICINA", "VANCOMICINA", "SULF. + TRIMETOPRIM", "CLORANFENICOL", "CEFTRIAXONA", "AMPICILINA", "RIFAMPICINA", "CIPROFLOXACINA", "OTROS", "LEVOFLOXACINA", "CLINDAMICINA"]}}'
	tabla_bacteriologia.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_vial'),
    ]

    operations = [
    	migrations.RunPython(anadirTablaBACT),
    ]
