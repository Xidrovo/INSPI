# INSPI
Proyecto de elaboración de programas para la evaluación de laboratorios participantes con el fin de evaluar su calidad.
FASE 1

## Database
### Postgresql 9.6

#### Dependencias del backend

> pip install psycopg2

> pip install django-tastypie

> pip install django-cors-headers

#### Set up de la base de datos
en api
Modificar con su información. settings.py
	        
	DATABASES = {
		'default': {
		    'ENGINE': 'django.db.backends.postgresql',
		    'NAME': '[databaseName]',
		    'USER': '[databaseUser]',
		    'PASSWORD': '[databasePass]',
		    'HOST': 'localhost',
		    'PORT': '5432',
		}
	}

Luego **copiar y pegar** settings.py en api/inspi/inspi

## Front-end
### Angular

abrir **Client**, en consola ejecutar el comando
> npm install

para correr el cliente se ejecuta el comando 
> ng serve --open

### Links útiles
> https://codeburst.io/create-a-django-api-in-under-20-minutes-2a082a60f6f3 Crear API en django.

> https://www.metaltoad.com/blog/angular-api-calls-django-authentication-jwt Llamada a la API

## Back-end: envío y recepción de parámetros
### Plantillas
#### Crear una plantilla
* URL: /api/plantillas/
* Método: POST
* Envío:

		{
			"titulo": "Plantilla 1",
			"descripcion": "Plantilla para el programa de evaluación externa de la calidad",
			"secciones": [
				{
					"titulo": "Sección A",
					"preguntas": [
						{
							"titulo": "Pregunta A.1",
							"descripcion": "En esta pregunta debe ingresar un párrafo.",
							"requerido": "True",
							"detalle": "",
							"tipo_data": {
								"id": <<id de tipo de dato>>
							}
						},
						{
							"titulo": "Pregunta A.2",
							"descripcion": "En esta pregunta el valor ingresado debe estar dentro del rango.",
							"requerido": "True",
							"detalle": "",
							"tipo_data": {
								"id": <<id de tipo de dato>>
							}
						}
					]
				},
				...
			]
		}

* Respuesta:
		
		{
			"error": 0
		}

#### Editar una plantilla
* URL: /api/plantillas/[plantilla_id]
* Método: PUT
* Envío:

		{
			"titulo": "Plantilla 2",
			"descripcion": "Plantilla para el programa de evaluación externa de la calidad",
			"secciones": [
				{
					"titulo": "Sección B",
					"preguntas": [
						{
							"titulo": "Pregunta B.1",
							"descripcion": "En esta pregunta debe ingresar un párrafo.",
							"requerido": "True",
							"detalle": "",
							"tipo_data": {
								"id": <<id de tipo de dato>>
							}
						},
						{
							"titulo": "Pregunta B.2",
							"descripcion": "En esta pregunta el valor ingresado debe estar dentro del rango.",
							"requerido": "True",
							"detalle": "",
							"tipo_data": {
								"id": <<id de tipo de dato>>
							}
						}
					]
				},
				...
			]
		}

* Respuesta:
		
		{
			"error": 0
		}

#### Obtener todas las plantillas
* URL: /api/plantillas/
* Método: GET
* Respuesta:

		{
		    "error": 0,
		    "plantillas": [
		    	{
		    	    "model": "api.plantilla",
		    	    "pk": 3,
		    	    "fields": {
		    	        "titulo": "Plantilla 1",
		    	        "descripcion": null
		    	    }
		    	},
		    	...
		    ]
		}

#### Visualizar información de una plantilla
* URL: /api/plantillas/[plantilla_id]
* Método: GET
* Respuesta:

		{
			"error": 0,
			"plantilla": {
			    "descripcion": "Plantilla para el programa de evaluación externa de la calidad",
			    "id": 4,
			    "titulo": "Plantilla 1",
			    "secciones": [
			        {
			            "id": 4,
			            "titulo": "Sección A",
			            "preguntas": [
			                {
			                    "requerido": true,
			                    "descripcion": "En esta pregunta el valor ingresado debe estar dentro del rango.",
			                    "detalle": "",
			                    "id": 6,
			                    "tipo_data": {
			                    	"id": "valor_exacto",
	                                "nombre": "Valor exacto",
	                                "detalle": ""
			                    },
			                    "titulo": "Pregunta A.2"
			                },
			            ]
			        }
			    ]
			}
		}

#### Eliminar una plantilla
* URL: /api/plantillas/[plantilla_id]
* Método: DELETE
* Respuesta:

		{
			"error": 0
		}

#### Estructura del campo detalle para preguntas de opción múltiple:

		[
			{
				"value": "",
				"name": "Opción_1"
			},
			{
				"value": "",
				"name": "Opción_2"
			},
			...
		]

### Programas
#### Crear un programa
* URL: /api/programas/[programa_id]
* Método: POST
* Envio:
		{
			"nombre" : "Nombre del programa",
			"plantilla_id" : << id de plantilla >>,
			"fecha_inicio" : "12/12/2018",
			"fecha_fin" : "12/12/2018",
			"fecha_envio_paquete" : "12/12/2018",
			"fecha_envio_resultados" : "12/12/2018"
		}
* Respuesta:

		{
			"error": 0
		}

#### Eliminar un programa
* URL: /api/programas/[programa_id]
* Método: DELETE
* Respuesta:

		{
			"error": 0
		}

### Tipos de dato
#### Obtener todos los tipos de dato
* URL: /api/tipos_de_dato/
* Método: GET
* Respuesta:

		{
		    "tipos_de_dato": [
		        {
	                "id": "seleccion_unica",
	                "nombre": "Selección única",
	                "detalle": "",
		        },
		        {
	                "id": "valor_exacto",
	                "nombre": "Valor exacto",
	                "detalle": "",
		        },
		        ...
		    ],
		    "error": 0
		}

(El campo "detalle" es utilizado únicamente para la definición de tablas RAM y Micobacterias)

**Recordar:** si hubo algún error al momento de procesar un requerimiento, la API responderá con el siguiente mensaje:

		{
			"error": 1,
			"msg:": "mensaje_de_error"
		}
