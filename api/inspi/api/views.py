from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from api.models import Plantilla, Seccion, TipoDeDato, Pregunta
import ast
import json

@csrf_exempt
def crearPlantilla(request):
	if request.method == "POST":
		# EXTRAER REPRESENTACION DE JSON EN STRING
		plantilla = request.body.decode("utf-8")

		# TRANSFORMAR STRING A DICCIONARIO
		plantillaJSON = json.loads(plantilla)

		plantillaJSON = plantillaJSON["PLANTILLA"]

		# EXTRACCION DE DATOS
		titulo_plantilla = plantillaJSON["TITULO_PLANTILLA"]
		secciones = plantillaJSON["SECCIONES"]

		# CREACION DE OBJETO PLANTILLA
		plantilla_obj = Plantilla().crear(titulo_plantilla)

		for seccion in secciones:
			titulo_seccion = seccion["TITULO_SECCION"] 
			preguntas = seccion["PREGUNTAS"]

			# CREACION DE OBJETO SECCION
			seccion_obj = Seccion().crear(titulo_seccion, plantilla_obj)

			for pregunta in preguntas:
				titulo_pregunta = pregunta["TITULO_PREGUNTA"]
				descripcion = pregunta["DESCRIPCION"]
				requerido = pregunta["REQUERIDO"] in ["True","true"]
				detalle = pregunta["DETALLE"]
				tipo_de_dato_id = pregunta["TIPO_DATO"]

				# BUSCAR EL TIPO DE DATO
				try:
					tipo_de_dato = TipoDeDato.objects.get(pk=tipo_de_dato_id)
				# SI NO ENCUENTRA EL TIPO DE DATO SE RETORNA UN TIPO DE DATOS 'DESCONOCIDO'
				except:
					tipo_de_dato = TipoDeDato.objects.get(nombre="desconocido")

				# CREACION DE OBJETO PREGUNTA
				pregunta_obj = Pregunta().crear(titulo_pregunta, descripcion, requerido, detalle, seccion_obj, tipo_de_dato)

		return JsonResponse({"RESPUESTA": "EXITO"})
	return JsonResponse({'RESPUESTA': 'ERROR_SOLICITUD'})