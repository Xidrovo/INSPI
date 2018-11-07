# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '5pr*-ha8-@_m$vs8n92f_pa=*c8#8sgjir(3r*f38477nan!16'

DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []

# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'inspi',
        'USER': 'postgres',
        'PASSWORD': 'cd3fg3cd3',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}