from django.db import models

# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
    	return '%s %s' % (self.title, self.body)

class TipoDeDato(models.Model):
	nombre = models.CharField(max_length=200)
	detalle = models.TextField()

	def __str__(self):
		return '%s' % (self.nombre)

class Pregunta(models.Model):
	titulo = models.CharField(max_length=200)
	descripcion = models.TextField()
	requerido = models.BooleanField()
	detalle = models.TextField()
	seccion = models.ForeignKey('Seccion', on_delete=models.CASCADE)
	tipo_de_dato = models.ForeignKey('TipoDeDato', on_delete=models.CASCADE)

	def __str__(self):
		return '%s' % (self.titulo)

class Seccion(models.Model):
	titulo = models.CharField(max_length=200)
	plantilla = models.ForeignKey('Plantilla', on_delete=models.CASCADE)

	def __str__(self):
		return '%s' % (self.titulo)

class Plantilla(models.Model):
	titulo = models.CharField(max_length=200)

	def __str__(self):
		return '%s' % (self.titulo)






