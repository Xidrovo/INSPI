from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from api.models import Plantilla, Seccion, TipoDeDato, Pregunta
from django.core import serializers
import ast
import json

# @csrf_exempt
class PlantillaView(View):
	def get(self, request, plantilla_id):
		if (plantilla_id is None):
			# obtenemos todas las plantillas existentes
			plantillas = Plantilla.objects.all()
			# transformamos el QuerySet de plantillas a un string de JSON y lo retornamos
			plantillas_str = serializers.serialize('json', plantillas)
			return HttpResponse(plantillas_str, content_type='application/json')
		else:
			# obtenemos la plantilla consultada y la retornamos
			plantilla = Plantilla.objects.get(pk=plantilla_id)
			return JsonResponse(plantilla.to_dict())

	def post(self, request, plantilla_id):
		# EXTRAER REPRESENTACION DE JSON EN STRING
		plantilla = request.body.decode('utf-8')

		# TRANSFORMAR STRING A DICCIONARIO
		plantillaJSON = json.loads(plantilla)

		# plantillaJSON = plantillaJSON['PLANTILLA']

		# EXTRACCION DE DATOS
		titulo_plantilla = plantillaJSON['titulo']
		descripcion_plantilla = plantillaJSON['descripcion']
		secciones = plantillaJSON['secciones']

		# CREACION DE OBJETO PLANTILLA
		plantilla_obj = Plantilla().crear(titulo_plantilla, descripcion_plantilla)

		for seccion in secciones:
			titulo_seccion = seccion['titulo'] 
			preguntas = seccion['preguntas']

			# CREACION DE OBJETO SECCION
			seccion_obj = Seccion().crear(titulo_seccion, plantilla_obj)

			for pregunta in preguntas:
				titulo_pregunta = pregunta['titulo']
				descripcion = pregunta['descripcion']
				requerido = pregunta['requerido'] in ['True','true']
				detalle = json.dumps(pregunta['detalle'])
				tipo_de_dato_id = pregunta['tipo_dato']

				# BUSCAR EL TIPO DE DATO
				try:
					tipo_de_dato = TipoDeDato.objects.get(pk=tipo_de_dato_id)
				# SI NO ENCUENTRA EL TIPO DE DATO SE RETORNA UN TIPO DE DATOS 'DESCONOCIDO'
				except:
					tipo_de_dato = TipoDeDato.objects.get(nombre='desconocido')

				# CREACION DE OBJETO PREGUNTA
				pregunta_obj = Pregunta().crear(titulo_pregunta, descripcion, requerido, detalle, seccion_obj, tipo_de_dato)

		return JsonResponse({'error': 0})

	# def put(self, request, plantilla_id):
	# 	return HttpResponse(str(plantilla_id))

	# def delete(self, request, plantilla_id)