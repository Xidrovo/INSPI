from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from api.models import Programa, Plantilla, Seccion, TipoDeDato, Pregunta
from django.core import serializers
import ast
import json

# @csrf_exempt
class PlantillaView(View):
	def get(self, request, plantilla_id):
		if (not plantilla_id):
			try:
				# obtenemos todas las plantillas existentes
				plantillas = []
				for plantilla in Plantilla.objects.all():					
					plantillas.append(plantilla.to_dict())
				# transformamos el QuerySet de plantillas a un string de JSON y lo retornamos
				#plantillas_str = serializers.serialize('json', plantillas)

				return JsonResponse({
					'error': 0,
					'plantillas': plantillas#json.loads(plantillas_str)
				})
			except Exception as e:
				return JsonResponse({
					'error': 1,
					'msg': 'Hubo un error al consultar las plantillas: ' + str(e)
				})
		else:
			if Plantilla.objects.filter(pk=plantilla_id).count() > 0:
				try:
					# obtenemos la plantilla consultada y la retornamos
					plantilla = Plantilla.objects.get(pk=plantilla_id)

					return JsonResponse({
						'error': 0,
						'plantilla': plantilla.to_dict()
					})
				except Exception as e:
					return JsonResponse({
						'error': 1,
						'msg': 'Hubo un error al consultar las plantillas: ' + str(e)
					})
			else:
				return JsonResponse({
					'error': 1,
					'msg': 'La plantilla que desea consultar no existe.'
				})

	def post(self, request, plantilla_id):
		try:
			# extraer el JSON como un string
			plantilla = request.body.decode('utf-8')

			# transformamos el string a un diccionario
			plantillaJSON = json.loads(plantilla)

			# extraemos los datos
			titulo_plantilla = plantillaJSON['titulo']
			descripcion_plantilla = plantillaJSON['descripcion']
			secciones = plantillaJSON['secciones']

			# creamos la nueva plantilla
			plantilla_obj = Plantilla().crear(titulo_plantilla, descripcion_plantilla)

			for seccion in secciones:
				titulo_seccion = seccion['titulo'] 
				preguntas = seccion['preguntas']

				# creamos una nueva sección y la asociamos a la plantilla
				seccion_obj = Seccion().crear(titulo_seccion, plantilla_obj)

				for pregunta in preguntas:
					# extraemos los datos para crear las preguntas
					titulo_pregunta = pregunta['titulo']
					descripcion = pregunta['descripcion']
					requerido = pregunta['requerido'] in ['True','true']
					detalle = json.dumps(pregunta['detalle'])
					tipo_de_dato_id = pregunta['tipo_dato']

					# buscamos el tipo de dato enviado
					try:
						tipo_de_dato = TipoDeDato.objects.get(pk=tipo_de_dato_id)
					# si no se encuentra el tipo de dato, se marca como 'desconocido'
					except:
						tipo_de_dato = TipoDeDato.objects.get(nombre='desconocido')

					# creamos la pregunta y la asociamos a la sección
					pregunta_obj = Pregunta().crear(titulo_pregunta, descripcion, requerido, detalle, seccion_obj, tipo_de_dato)
			return JsonResponse({'error': 0})
		except Exception as e:
			return JsonResponse({
				'error': 1,
				'msg': 'Hubo un error al crear la nueva plantilla: ' + str(e)
			})

	def put(self, request, plantilla_id):
		if Plantilla.objects.filter(pk=plantilla_id).count() > 0:
			try:
				# extraer el JSON como un string
				plantilla_str = request.body.decode('utf-8')

				# transformamos el string a un diccionario
				plantillaJSON = json.loads(plantilla_str)

				# traemos la plantilla que se desea editar y la actualizamos
				plantilla_obj = Plantilla.objects.get(pk=plantilla_id)
				plantilla_obj.titulo = plantillaJSON['titulo']
				plantilla_obj.descripcion = plantillaJSON['descripcion']
				plantilla_obj.save()

				# borramos todas las secciones existentes (y sus preguntas)
				Seccion.objects.filter(plantilla=plantilla_id).delete()

				# extraemos los datos para las secciones
				secciones = plantillaJSON['secciones']

				for seccion in secciones:
					titulo_seccion = seccion['titulo'] 
					preguntas = seccion['preguntas']

					# creamos una nueva sección y la asociamos a la plantilla
					seccion_obj = Seccion().crear(titulo_seccion, plantilla_obj)

					for pregunta in preguntas:
						# extraemos los datos para las preguntas
						titulo_pregunta = pregunta['titulo']
						descripcion = pregunta['descripcion']
						requerido = pregunta['requerido'] in ['True','true']
						detalle = json.dumps(pregunta['detalle'])
						tipo_de_dato_id = pregunta['tipo_dato']

						# buscamos el tipo de dato enviado
						try:
							tipo_de_dato = TipoDeDato.objects.get(pk=tipo_de_dato_id)
						# si no se encuentra el tipo de dato, se marca como 'desconocido'
						except:
							tipo_de_dato = TipoDeDato.objects.get(nombre='desconocido')

						# creamos la pregunta y la asociamos a la sección
						pregunta_obj = Pregunta().crear(titulo_pregunta, descripcion, requerido, detalle, seccion_obj, tipo_de_dato)
				return JsonResponse({'error': 0})
			except Exception as e:
				return JsonResponse({
					'error': 1,
					'msg': 'Hubo un error al crear la nueva plantilla: ' + str(e)
				})
		else:
			return JsonResponse({
				'error': 1,
				'msg': 'La plantilla que desea editar no existe.'
			})

	def delete(self, request, plantilla_id):
		if Plantilla.objects.filter(pk=plantilla_id).count() > 0:
			try:
				Plantilla.objects.get(pk=plantilla_id).delete()
				return JsonResponse({'error': 0})
			except Exception as e:
				return JsonResponse({
					'error': 1,
					'msg': 'Hubo un error al tratar de borrar la plantilla.'
				})
		else:
			return JsonResponse({
				'error': 1,
				'msg': 'La plantilla que desea eliminar no existe.'
			})

class ProgramaView(View):
	def put(self, request, programa_id):
		if Programa.objects.filter(pk=programa_id).count() > 0:
			try:
				# extraer el JSON como un string
				programa_str = request.body.decode('utf-8')

				# transformamos el string a un diccionario
				programaJSON = json.loads(programa_str)

				# traemos el programa que se desea editar y la actualizamos
				programa_obj = Programa.objects.get(pk=programa_id)
				programa_obj.fecha_inicio = programaJSON['fecha_inicio']
				programa_obj.fecha_fin = programaJSON['fecha_fin']
				programa_obj.fecha_envio_paquete = programaJSON['fecha_envio_paquete']
				programa_obj.fecha_envio_resultados = programaJSON['fecha_envio_resultados']
				programa_obj.save()

				return JsonResponse({'error': 0})
			except Exception as e:
				return JsonResponse({
					'error': 1,
					'msg': 'Hubo un error al crear el nuevo programa: ' + str(e)
				})
		else:
			return JsonResponse({
				'error': 1,
				'msg': 'El programa que desea editar no existe.'
			})

	def get(self, request, programa_id):
		if (not programa_id):
			try:
				# obtenemos todos los programas existentes
				programas = Programa.objects.all()
				# transformamos el QuerySet de programas a un string de JSON y lo retornamos
				programas_str = serializers.serialize('json', programas)

				return JsonResponse({
					'error': 0,
					'programas': json.loads(programas_str)
				})
			except Exception as e:
				return JsonResponse({
					'error': 1,
					'msg': 'Hubo un error al consultar los programas: ' + str(e)
				})
		else:
			if Programa.objects.filter(pk=programa_id).count() > 0:
				try:
					# obtenemos el programa consultado y lo retornamos
					programa = Programa.objects.get(pk=programa_id)

					return JsonResponse({
						'error': 0,
						'programa': programa.to_dict()
					})
				except Exception as e:
					return JsonResponse({
						'error': 1,
						'msg': 'Hubo un error al consultar el programa: ' + str(e)
					})
			else:
				return JsonResponse({
					'error': 1,
					'msg': 'El programa que desea consultar no existe.'
				})

	def delete(self, request, programa_id):
		if programa_id:
			try:
				Programa.objects.get(pk=programa_id).delete()
				return JsonResponse({'error': 0})
			except Exception as e:
				return JsonResponse({
					'error': 1,
					'msg': 'Hubo un error al tratar de borrar el programa.'
				})
		else:
			return JsonResponse({
					'error': 1,
					'msg': 'Error de solicitud'
				})

def get_tipos_de_dato(request):
	if request.method == "GET":
		try:
			# obtenemos todos los tipos de dato existentes
			tipos_de_dato = TipoDeDato.objects.all()
			# transformamos el QuerySet de tipos de dato a un string de JSON y lo retornamos
			tipos_de_dato_str = serializers.serialize('json', tipos_de_dato)

			return JsonResponse({
				'error': 0,
				'tipos_de_dato': json.loads(tipos_de_dato_str)
			})
		except Exception as e:
			return JsonResponse({
				'error': 1,
				'msg': 'Hubo un error al consultar los tipos de dato: ' + str(e)
			})