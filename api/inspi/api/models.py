from django.db import models
import json

# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
    	return '%s %s' % (self.title, self.body)

class TipoDeDato(models.Model):
	nombre = models.CharField(max_length=200)
	detalle = models.TextField(blank=True)

	def __str__(self):
		return '%s' % (self.nombre)

class Pregunta(models.Model):
	titulo = models.CharField(max_length=200)
	descripcion = models.TextField()
	requerido = models.BooleanField()
	detalle = models.TextField()
	seccion = models.ForeignKey('Seccion', on_delete=models.CASCADE)
	tipo_de_dato = models.ForeignKey('TipoDeDato', on_delete=models.CASCADE)

	def crear(self, titulo, descripcion, requerido, detalle, seccion, tipo_de_dato):
		p = Pregunta()
		p.titulo = titulo
		p.descripcion = descripcion
		p.requerido = requerido
		p.detalle = detalle
		p.seccion = seccion
		p.tipo_de_dato = tipo_de_dato
		p.save()
		return p

	def to_dict(self):
		if not self.detalle:
			detalle = ""
		else:
			detalle = json.loads(self.detalle)

		return {
			'id':self.pk,
			'titulo':self.titulo,
			'descripcion':self.descripcion,
			'requerido':self.requerido,
			'detalle':detalle,
			'tipo_data':self.tipo_de_dato.pk
		}

	def __str__(self):
		return '%s - SEC: %s - PLANT: %s' % (self.titulo, self.seccion.titulo, self.seccion.plantilla.titulo)

class Seccion(models.Model):
	titulo = models.CharField(max_length=200)
	plantilla = models.ForeignKey('Plantilla', on_delete=models.CASCADE)

	@property
	def preguntas(self):
		return Pregunta.objects.filter(seccion=self.pk)

	def crear(self, titulo, plantilla):
		s = Seccion()
		s.titulo = titulo
		s.plantilla = plantilla
		s.save()
		return s 

	def to_dict(self):
		preguntas = []
		for pregunta in self.preguntas:
			preguntas.append(pregunta.to_dict())
		return {
			'id':self.pk,
			'titulo':self.titulo,
			'preguntas':preguntas
		}

	def __str__(self):
		return '%s - PLANT: %s' % (self.titulo, self.plantilla.titulo)

class Plantilla(models.Model):
	titulo = models.CharField(max_length=200)
	descripcion = models.TextField(default=None, blank=True, null=True)

	def crear(self, titulo, descripcion):
		p = Plantilla()
		p.titulo = titulo
		p.descripcion = descripcion
		p.save()
		return p

	@property
	def secciones(self):
		return Seccion.objects.filter(plantilla=self.pk)

	def to_dict(self):
		secciones = []
		for seccion in self.secciones:
			secciones.append(seccion.to_dict())
		return {
			'id':self.pk,
			'titulo':self.titulo,
			'descripcion':self.descripcion,
			'secciones':secciones
		}

	def __str__(self):
		return '%s' % (self.titulo)