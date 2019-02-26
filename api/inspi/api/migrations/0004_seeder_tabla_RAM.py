from django.db import migrations

def anadirTablaRAM(apps, schema_editor):
	TipoDeDato_model = apps.get_model('api', 'TipoDeDato')
	tabla_ram = TipoDeDato_model.objects.get(pk='tabla_ram')
	tabla_ram.detalle = '{"COLUMNAS" : [{"cabecera" : "DIFUSIÓN DE DISCO- KIRBY BAUER","cant_columnas" : 3,"campos" : [{"titulo" : "Carga del disco", "tipo_dato" : "number"},{"titulo" : "Diámetro del Halo(mm)", "tipo_dato" : "number"},{"titulo" : "Interpretación", "tipo_dato" : "text"}]},{"cabecera" : "MICRODILUCIÓN EN CALDO","cant_columnas" : 2,"campos" : [{"titulo" : "CIM (μg/ml)", "tipo_dato" : "number"},{"titulo" : "Interpretación", "tipo_dato" : "text"}]}],"FILAS" : [{"cabecera" : "NOMBRE DEL ANTIBIOTICO","campos" : ["Meropenem", "Ceftazidima", "Aztreonam", "Ciprofloxacina", "Colistín", "*"]}]}'
	tabla_ram.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_seeder_plantillas'),
    ]

    operations = [
    	migrations.RunPython(anadirTablaRAM),
    ]