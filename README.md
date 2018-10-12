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
* URL: /api/crearPlantilla
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
							"tipo_dato": 5
						},
						{
							"titulo": "Pregunta A.2",
							"descripcion": "En esta pregunta el valor ingresado debe estar dentro del rango.",
							"requerido": "True",
							"detalle": {
								"inicio": 1,
								"fin": 9
							},
							"tipo_dato": 4
						}
					]
				},
				...
			]
		}
* Respuesta
		
		{"error": 0}
* **Recordar:** dependiendo de si hubo algún error o no al procesar los datos recibidos, la API responderá con un valor 1 o 0 respectivamente

#### Obtener todas las plantillas
* URL: /api/getAllPlantillas
* Método: GET
* Respuesta:

		[
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

#### Visualizar información de una plantilla
* URL: /api/readPlantilla/[plantilla_id]
* Método: GET
* Respuesta:

		{
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
		                    "detalle": {
		                        "inicio": 1,
		                        "fin": 9
		                    },
		                    "id": 6,
		                    "tipo_data": 15,
		                    "titulo": "Pregunta A.2"
		                },
		                {
		                    "requerido": true,
		                    "descripcion": "En esta pregunta debe ingresar un párrafo.",
		                    "detalle": "",
		                    "id": 5,
		                    "tipo_data": 15,
		                    "titulo": "Pregunta A.1"
		                }
		            ]
		        }
		    ]
		}

