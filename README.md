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