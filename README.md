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
			"nombre" : "Programa de prueba 1",
			"plantilla_id" : 1,
			"fecha_inicio" : "2018-12-12",
			"fecha_fin" : "2018-12-12",
			"fecha_envio_paquete" : "2018-12-12",
			"fecha_envio_resultados" : "2018-12-12"
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

### Viales
#### Obtener todos los viales de un programa
* URL: /api/programas/viales/*programa_id*
* Método: GET
* Respuesta:

		{
			"viales": [
			    {
			        "codigo": "ABC123",
			        "respuestas": {
			        	"<<id_pregunta_rango>>": {
			        		"min": 10,
			        		"max": 20
		        		},
			        	"<<id_pregunta_valor_exacto>>": 200,
			        	"<<id_pregunta_seleccion_multiple>>": [
			        		value_opcion1,
			        		value_opcion2
			        	],
			        	"<<id_pregunta_seleccion_unica>>": value_opcion
			        	"<<id_pregunta_texto>>": "Bacon ipsum dolor amet tenderloin cupim pork burgdoggen ham hock ribeye. Shankle pork chop ham hock burgdoggen, ball tip beef ribs pork loin pork belly sausage beef tri-tip flank corned beef hamburger tongue"
			        },
			        "id": <<id_vial>>
			    }
			],
			"error": 0
		}

#### Obtener la plantilla de un programa
* URL: /api/programas/plantilla/*programa_id*
* Método: GET
* Respuesta:

		{
			"plantilla": {
			    "descripcion": "Plantilla para el programa de evaluación externa de la calidad",
			    "titulo": "Plantilla 1",
			    "secciones": [
			        {
			            "preguntas": [
			                {
			                    "detalle": [
			                        {
			                            "name": "Opción 1",
			                            "value": 100
			                        },
			                        {
			                            "name": "Opción 2",
			                            "value": 200
			                        },
			                        {
			                            "name": "Opción 3",
			                            "value": 300
			                        }
			                    ],
			                    "descripcion": "Los valores mostrados a continuación corresponden mediciones de calibación de herramientas de diversas marcas. Escoja aquel que sea más cercano al de sus instrumentos.",
			                    "tipo_data": {
			                        "detalle": "",
			                        "nombre": "Selección única",
			                        "id": "seleccion_unica"
			                    },
			                    "requerido": true,
			                    "titulo": "Pregunta A.1 - Escoja un valor de calibración de instrumentos",
			                    "id": <<id_pregunta>>
			                },
			                {
			                    "detalle": "",
			                    "descripcion": "Debe describir detenidamente las características de las bacterias observadas en la muestra, así como el proceso que siguió para el análisis.",
			                    "tipo_data": {
			                        "detalle": "",
			                        "nombre": "Texto",
			                        "id": "texto"
			                    },
			                    "requerido": true,
			                    "titulo": "Pregunta A.2 - Describa la muestra observada",
			                    "id": <<id_pregunta>>
			                }
			            ],
			            "titulo": "Sección A",
			            "id": <<id_seccion>>
			        },
			        {
			            "preguntas": [
			                {
			                    "detalle": "",
			                    "descripcion": "Debe ingresar cuántas anomalías en total detectó durante el análisis de la muestra.",
			                    "tipo_data": {
			                        "detalle": "",
			                        "nombre": "Rango",
			                        "id": "rango"
			                    },
			                    "requerido": true,
			                    "titulo": "Pregunta B.1 - Ingrese la cantidad de anomalías detectadas",
			                    "id": <<id_pregunta>>
			                }
			            ],
			            "titulo": "Sección B",
			            "id": <<id_seccion>>
			        }
			    ],
			    "id": <<id_plantilla>>
			},
			"error": 0
		}

#### Crear un vial
* URL: /api/viales/*programa_id*
* Método: POST
* Envío:
	{
		"codigo": "abc123",
		"respuestas": [
	        {
	            "id": 1,
	            "tipo": "seleccion_unica",
	            "respuesta": {
	                "value": 200,
	                "name": "Opción 2"
	            }
	        },
	        {
	            "id": 2,
	            "tipo": "texto",
	            "respuesta": {
	                "value": "Esta es una respuesta valida"
	            }
	        },
	        {
	            "id": 3,
	            "tipo": "rango",
	            "respuesta": {
	                "min": "10",
	                "max": "100"
	            }
	        }
	    ]
	}

* Respuesta:

		{
			"error": 0
		}

#### Editar un vial
* URL: /api/viales/
* Método: PUT
* Envío:
	{
		"codigo": "abc123",
		"respuestas": [
	        {
	            "id": 1,
	            "tipo": "seleccion_unica",
	            "respuesta": {
	                "value": 200,
	                "name": "Opción 2"
	            }
	        },
	        {
	            "id": 2,
	            "tipo": "texto",
	            "respuesta": {
	                "value": "Esta es una respuesta valida"
	            }
	        },
	        {
	            "id": 3,
	            "tipo": "rango",
	            "respuesta": {
	                "min": "10",
	                "max": "100"
	            }
	        }
	    ]
	}

* Respuesta:
	{
	    "error": 0,
	    "msg": "El vial se ha actualizado con éxito"
	}

### Obtener todos los viales de un programa
* URL: /api/viales/*programa_id*
* Método: GET
* Respuesta:
		{
		    "error": 0,
		    "viales": [
		        {
		            "codigo": "abc123"
		        },
		        {
		            "codigo": "abc456"
		        }
		    ]
		}

### Obtener datos de un vial especifico
* URL: /api/viales/?codigo=*codigo_vial*
* Método: GET
* Respuesta:
		{
		    "error": 0,
		    "codigo": "abc123",
		    "respuesta": [
		        {
		            "id": 1,
		            "tipo": "seleccion_unica",
		            "respuesta": {
		                "value": 200,
		                "name": "Opción 2"
		            }
		        },
		        {
		            "id": 2,
		            "tipo": "texto",
		            "respuesta": {
		                "value": "Esta es una respuesta valida"
		            }
		        },
		        {
		            "id": 3,
		            "tipo": "rango",
		            "respuesta": {
		                "min": "10",
		                "max": "100"
		            }
		        }
		    ]
		}

### Borrar(Archivar) un vial
* URL: /api/viales/*programa_id*
* Método: DELETE
* Envío:
	{
		"codigo" : "abc123"
	}
	
* Respuesta:
	{
        "error": 0,
        "msg": "El vial se ha archivado con éxito"
    }

## Estructuras para las tablas
### Tabla RAM
	{
	    "COLUMNAS" : {
	        "DIFUSIÓN DE DISCO- KIRBY BAUER" : ["Carga del disco", "Diámetro del Halo(mm)", "Interpretación"],
	        "MICRODILUCIÓN EN CALDO" : ["CIM (μg/ml) ", "Interpretación"]
	    },
	    "FILAS" : {
	        "NOMBRE DEL ANTIBIOTICO" : ["Meropenem", "Ceftazidima", "Aztreonam", "Ciprofloxacina", "Colistín", "*"]
	    }
	}

### Tabla Bacteriología
	{
		"COLUMNAS" : [
			{
				"cabecera": "KIRBY BAUER",
				"cant_columnas": 4,
				"campos": [
					{"titulo": "CARGA", "tipo_dato": "number"}, 
					{"titulo": "MARCA", "tipo_dato": "text"}, 
					{"titulo": "LECTURA DEL DISCO (mm)", "tipo_dato": "number"}, 
					{"titulo": "INTERPRETACION", "tipo_dato": "text"}
				]
			},
			{
				"cabecera": "MIC",
				"cant_columnas": 3,
				"campos": [
					{"titulo": "MARCA", "tipo_dato": "text"}, 
					{"titulo": "RESULTADO (ug/mL)", "tipo_dato": "number"}, 
					{"titulo": "INTERPRETACION", "tipo_dato": "text"}
				]
			}				 				 
		],
		"FILAS" : {
			"cabecera": "NOMBRE DEL ANTIBIOTICO",
			"campos": ["OXACILINA", "PENICILINA", "ERITROMICINA", "VANCOMICINA", "SULF. + TRIMETOPRIM", "CLORANFENICOL", "CEFTRIAXONA", "AMPICILINA", "RIFAMPICINA", "CIPROFLOXACINA", "OTROS", "LEVOFLOXACINA", "CLINDAMICINA"] 
		}
	}