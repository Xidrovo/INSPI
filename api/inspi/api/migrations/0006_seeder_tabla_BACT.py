from django.db import migrations

def anadirTablaBACT(apps, schema_editor):
	TipoDeDato_model = apps.get_model('api', 'TipoDeDato')
	tabla_bacteriologia = TipoDeDato_model.objects.get(pk='tabla_bacteriologia')
	tabla_bacteriologia.detalle = '{"COLUMNAS" : [{"cabecera": "KIRBY BAUER","cant_columnas": 4,"campos": [{"titulo": "CARGA", "tipo_dato": "number"},{"titulo": "MARCA", "tipo_dato": "text"},{"titulo": "LECTURA DEL DISCO (mm)", "tipo_dato": "number"},{"titulo": "INTERPRETACION", "tipo_dato": "text"}]},{"cabecera": "MIC","cant_columnas": 3,"campos": [{"titulo": "MARCA", "tipo_dato": "text"},{"titulo": "RESULTADO (ug/mL)", "tipo_dato": "number"},{"titulo": "INTERPRETACION", "tipo_dato": "text"}]}],"FILAS" : {"cabecera": "NOMBRE DEL ANTIBIOTICO","campos": ["OXACILINA", "PENICILINA", "ERITROMICINA", "VANCOMICINA", "SULF. + TRIMETOPRIM", "CLORANFENICOL", "CEFTRIAXONA", "AMPICILINA", "RIFAMPICINA", "CIPROFLOXACINA", "OTROS", "LEVOFLOXACINA", "CLINDAMICINA"]}}'
	tabla_bacteriologia.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_vial'),
    ]

    operations = [
    	migrations.RunPython(anadirTablaBACT),
    ]