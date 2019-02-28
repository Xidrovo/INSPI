from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from api.models import Programa, Plantilla, Seccion, TipoDeDato, Pregunta, Vial
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
                # for plantilla in Plantilla.objects.all().filter().order_by('id'):
                for plantilla in Plantilla.objects.filter(deleted__exact=False).order_by('-id'):
                    plantillas.append(plantilla.to_dict())

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
            if Plantilla.objects.filter(pk=plantilla_id, deleted__exact=False).count() > 0:
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
                    tipo_de_dato_id = pregunta['tipo_data']['id']

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
        if Plantilla.objects.filter(pk=plantilla_id, deleted__exact=False).count() > 0:
            try:
                # buscamos plantilla
                plantilla_obj = Plantilla.objects.get(pk=plantilla_id)

                # extraer el JSON como un string
                plantilla_str = request.body.decode('utf-8')

                # transformamos el string a un diccionario
                plantillaJSON = json.loads(plantilla_str)

                # extraemos los datos
                titulo_plantilla = plantillaJSON['titulo']
                descripcion_plantilla = plantillaJSON['descripcion']
                secciones = plantillaJSON['secciones']

                # verificamos el estado de la plantilla
                # si su estado es Activo ('a') entonces se debe dubplicar la plantilla, es decir, crear una plantilla nueva
                # con los datos enviados y con estado Inicial ('i')
                if plantilla_obj.estado is 'a':
                    # creamos la nueva plantilla
                    titulo_plantilla = titulo_plantilla + ' [DUPLICADO]'
                    plantilla_obj = Plantilla().crear(titulo_plantilla, descripcion_plantilla)
                else:
                    # si su estado es Inicial ('i') entonces se puede actualizar la plantilla
                    plantilla_obj = Plantilla.objects.get(pk=plantilla_id)
                    plantilla_obj.titulo = titulo_plantilla
                    plantilla_obj.descripcion = descripcion_plantilla
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
                        tipo_de_dato_id = pregunta['tipo_data']['id']

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
        if Plantilla.objects.filter(pk=plantilla_id, deleted__exact=False).count() > 0:
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
    def post(self, request, programa_id):
        try:
            # extraer el JSON como un string
                programa_str = request.body.decode('utf-8')

                # transformamos el string a un diccionario
                programaJSON = json.loads(programa_str)

                # obtenemos los campos
                nombre = programaJSON['nombre']
                plantilla_id = programaJSON.get('plantilla_id', None)
                fecha_inicio = programaJSON['fecha_inicio']
                fecha_fin = programaJSON['fecha_fin']
                fecha_envio_resultados = programaJSON['fecha_envio_resultados']
                fecha_envio_paquete = programaJSON['fecha_envio_paquete']

                programa_obj = Programa().crear(nombre, plantilla_id, fecha_inicio, fecha_fin, fecha_envio_resultados, fecha_envio_paquete)
                if programa_obj:
                    return JsonResponse({'error': 0, 'programa_id': programa_obj.id})

                else:
                    return JsonResponse({
                        'error': 1,
                        'msg': 'Hubo un error al crear el nuevo programa'
                    })

        except Exception as e:
            return JsonResponse({
                'error': 1,
                'msg': 'Hubo un error al crear el nuevo programa: ' + str(e)
            })

    def put(self, request, programa_id):
        if Programa.objects.filter(pk=programa_id, deleted__exact=False).count() > 0:
            try:
                # extraer el JSON como un string
                programa_str = request.body.decode('utf-8')

                # transformamos el string a un diccionario
                programaJSON = json.loads(programa_str)

                # traemos el programa que se desea editar y la actualizamos
                programa_obj = Programa.objects.get(pk=programa_id)
                programa_obj.nombre = programaJSON['nombre']

                if programa_obj.plantilla.estado is 'a':
                    raise Exception('Error de Plantilla en uso. No puede cambiar la plantilla asignada al programa pues aun existen viales asociados.')
                else:
                    programa_obj.plantilla = Plantilla.objects.get(pk=programaJSON.get('plantilla_id', None))

                programa_obj.fecha_inicio = programaJSON['fecha_inicio']
                programa_obj.fecha_fin = programaJSON['fecha_fin']
                programa_obj.fecha_envio_paquete = programaJSON['fecha_envio_paquete']
                programa_obj.fecha_envio_resultados = programaJSON['fecha_envio_resultados']
                programa_obj.save()

                return JsonResponse({'error': 0, 'programa_id': programa_obj.id})
            except Exception as e:
                return JsonResponse({
                    'error': 1,
                    'msg': 'Hubo un error al editar el programa: ' + str(e)
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
                programas = Programa.objects.filter(deleted__exact=False).order_by('-id')
                # armamos el paquete de programas
                paquete = []
                for programa in programas:
                    paquete.append({
                            'id' : programa.id,
                            'nombre' : programa.nombre,
                            'plantilla_id' : programa.plantilla.id,
                            'plantilla_nombre' : programa.plantilla.titulo,
                            'fecha_inicio' : programa.fecha_inicio,
                            'fecha_fin' : programa.fecha_fin,
                            'fecha_envio_paquete' : programa.fecha_envio_paquete,
                            'fecha_envio_resultados' : programa.fecha_envio_resultados
                        })

                return JsonResponse({
                    'error': 0,
                    'programas': paquete
                })
            except Exception as e:
                return JsonResponse({
                    'error': 1,
                    'msg': 'Hubo un error al consultar los programas: ' + str(e)
                })
        else:
            if Programa.objects.filter(pk=programa_id, deleted__exact=False).count() > 0:
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

class VialView(View):
    def post(self, request, programa_id):
        if Programa.objects.filter(pk=programa_id, deleted__exact=False).count() > 0:
            try:
                # extraer el JSON como un string
                vial_str = request.body.decode('utf-8')

                # transformamos el string a un diccionario
                vial_json = json.loads(vial_str)

                # obtenemos los campos
                codigo = vial_json['codigo']
                respuestas = json.dumps(vial_json['respuestas'])

                if Vial.objects.filter(codigo__exact=codigo, deleted__exact=False).count() > 0:
                    raise Exception('Error de Duplicidad. El código \'' + codigo + '\' ya está en uso.')
                elif Vial.objects.filter(codigo__exact=codigo, deleted__exact=True).count() > 0:
                    # traemos el programa al que se desea anadir un vial
                    programa_obj = Programa.objects.get(pk=programa_id)

                    # creamos el nuevo vial
                    vial_obj = Vial.objects.get(codigo=codigo)
                    vial_obj.respuestas = respuestas
                    vial_obj.programa = programa_obj
                    vial_obj.deleted = False
                    vial_obj.save()

                    # cambiamos el estado de la plantilla asignada al programa
                    programa_obj.plantilla.estado = 'a'
                    programa_obj.plantilla.save()

                    return JsonResponse({
                        'error': 0,
                        'msg' : 'Vial creado con exito'
                    })
                else:
                    # traemos el programa al que se desea anadir un vial
                    programa_obj = Programa.objects.get(pk=programa_id)

                    # creamos el nuevo vial
                    vial_obj = Vial().crear(codigo, respuestas, programa_obj)

                    # cambiamos el estado de la plantilla asignada al programa
                    programa_obj.plantilla.estado = 'a'
                    programa_obj.plantilla.save()

                    return JsonResponse({
                        'error': 0,
                        'msg' : 'Vial creado con exito'
                    })
            except Exception as e:
                return JsonResponse({
                    'error': 1,
                    'msg': 'Hubo un error al crear el nuevo vial: ' + str(e)
                })
        else:
            return JsonResponse({
                'error': 1,
                'msg': 'El programa no existe'
            })

    def get(self, request, programa_id):
        vial_id = request.GET.get("codigo", None)
        if vial_id:
            try:
                vial = Vial.objects.get(codigo=vial_id)
                if vial.deleted == False:
                    return JsonResponse({
                        'error': 0,
                        'codigo': vial.codigo,
                        'respuesta' : json.loads(vial.respuestas) 
                    })
                else:
                    return JsonResponse({
                        'error': 1,
                        'msg': 'El vial esta archivado'
                    })
            except:
                return JsonResponse({
                    'error': 1,
                    'msg': 'El vial no existe'
                })

        else:
            if Programa.objects.filter(pk=programa_id, deleted__exact=False).count() > 0:
                programa = Programa.objects.get(pk=programa_id)
                viales = Vial.objects.filter(programa=programa)
                paquete = []
                for vial in viales:
                    if vial.deleted == False:
                        paquete.append({
                            "codigo" : vial.codigo
                        })
                return JsonResponse({
                    'error': 0,
                    'viales': paquete
                })
            else:
                return JsonResponse({
                    'error': 1,
                    'msg': 'El programa no existe'
                })

    def put(self, request, programa_id):
        try:
            # extraer el JSON como un string
            vial_str = request.body.decode('utf-8')
            # transformamos el string a un diccionario
            vial_json = json.loads(vial_str)

            vial_id = vial_json.get('codigo', None)
            vial = Vial.objects.filter(codigo=vial_id)
            if len(vial) == 1:
                # obteniendo la instancia del vial
                vial = vial[0]
                # obteniendo el JSON de respuestas
                respuestas = json.dumps(vial_json['respuestas'])
                # actualizando el vial
                vial_obj = Vial().editar(vial, respuestas)
                if vial_obj:
                    return JsonResponse({
                        'error': 0,
                        'msg': 'El vial se ha actualizado con éxito'
                    })
                else:
                    return JsonResponse({
                        'error': 1,
                        'msg': 'Error actualizando el vial'
                    })
            else:
                return JsonResponse({
                    'error': 1,
                    'msg': 'El vial no existe'
                })
        except Exception as e:
            return JsonResponse({
                'error': 1,
                'msg': 'Error de solicitud' + str(e)
            })

    def delete(self, request, programa_id):
        try:
            # extraer el JSON como un string
            vial_str = request.body.decode('utf-8')
            # transformamos el string a un diccionario
            vial_json = json.loads(vial_str)

            codigo = vial_json.get('codigo', None)
            vial = Vial.objects.get(codigo=codigo)
            vial.deleted = True
            vial.save()

            # si el programa ya no tiene viales, entonces su plantilla debe cambiar a estado Inicial ('i')
            if Vial.objects.filter(programa=programa_id).count() is 0:
                programa = Programa.objects.get(pk=programa_id)
                programa.plantilla.estado = 'i'
                programa.plantilla.estado.save()

            return JsonResponse({
                'error': 0,
                'msg': 'El vial se ha archivado con éxito'
            })
        except:
            return JsonResponse({
                'error': 1,
                'msg': 'El vial no existe'
            })

def get_tipos_de_dato(request):
    if request.method == "GET":
        try:
            # obtenemos todos los tipos de dato existentes
            tipos_de_dato = []
            for tipo_de_dato in TipoDeDato.objects.filter(deleted__exact=False):
                tipos_de_dato.append(tipo_de_dato.to_dict())

            return JsonResponse({
                'error': 0,
                'tipos_de_dato': tipos_de_dato
            })
        except Exception as e:
            return JsonResponse({
                'error': 1,
                'msg': 'Hubo un error al consultar los tipos de dato: ' + str(e)
            })

def get_respuestas_viales(request, codigo):
    try:
        vial = Vial.objects.get(codigo=codigo)
        preguntas_respondidas = json.loads(vial.respuestas)
        if not vial.deleted:
            plantilla = vial.programa.plantilla.to_dict()
            secciones = plantilla.get("secciones",None)
            secciones_dic = []
            for seccion in secciones:
                preguntas = seccion.get("preguntas", None)
                preguntas_dic = []
                for pregunta in preguntas:
                    respuesta_pregunta = None
                    for r in preguntas_respondidas:
                        if int(pregunta["id"]) == int(r["id"]):
                            respuesta_pregunta = r["respuesta"]
                    preguntas_dic.append({
                        "pregunta_id" : pregunta["id"],
                        "titulo" : pregunta["titulo"],
                        "tipo" : pregunta["tipo_data"]["id"],
                        "respuesta" :  respuesta_pregunta
                    })

                secciones_dic.append({
                    "seccion_id" : seccion["id"],
                    "titulo" : seccion["titulo"],
                    "preguntas" : preguntas_dic
                })
            return JsonResponse({
                'error': 0,
                'codigo': vial.codigo,
                'respuesta' : secciones_dic
            })
        else:
            return JsonResponse({
                'error': 1,
                'msg': 'El vial esta archivado'
            })
    except Exception as e:
        return JsonResponse({
            'error': 1,
            'msg': 'El vial no existe ' + str(e)
        })


def get_viales(request, programa_id):
    if request.method == "GET":
        try:
            programa = Programa.objects.get(pk=programa_id)
            viales = Vial.objects.filter(programa=programa)
            viales_ARR = []
            for vial in viales:
                if not vial.deleted:
                    viales_ARR.append({
                        "codigo" : vial.codigo
                    })
            return JsonResponse({
                'error': 0,
                'viales': viales_ARR
            })
        except:
            return JsonResponse({
                'error': 1,
                'msg': 'Programa no existe'
            })
    return JsonResponse({
        'error': 1,
        'msg': 'Error de solicitud'
    })
    

def get_programa_plantilla(request, programa_id):
    if request.method == "GET":
        if Programa.objects.filter(pk=programa_id, deleted__exact=False).count() > 0:
            try:
                programa = Programa.objects.get(pk=programa_id)

                return JsonResponse({
                    'error': 0,
                    'plantilla': programa.plantilla.to_dict()
                })
            except Exception as e:
                return JsonResponse({
                    'error': 1,
                    'msg': 'Hubo un error al consultar la plantilla: ' + str(e)
                })