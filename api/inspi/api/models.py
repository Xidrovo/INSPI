from django.db import models
from django.db.models.functions import Lower
import json

# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
    	return '%s %s' % (self.title, self.body)

class TipoDeDato(models.Model):
	tipo_de_dato_id = models.CharField(primary_key=True, max_length=50, default="")
	nombre = models.CharField(max_length=200)
	detalle = models.TextField(blank=True)
	deleted = models.BooleanField(default=False)

	def delete(self):
		self.deleted = True
		self.save()

	def to_dict(self):		
		if not self.detalle:
			detalle = ""
		else:
			detalle = json.loads(self.detalle)

		return {
			"id": self.pk,
			"nombre": self.nombre,
			"detalle": detalle
		}

	def __str__(self):
		return '%s' % (self.nombre)

class Pregunta(models.Model):
	titulo = models.CharField(max_length=200)
	descripcion = models.TextField()
	requerido = models.BooleanField()
	detalle = models.TextField()
	seccion = models.ForeignKey('Seccion', on_delete=models.CASCADE)
	tipo_de_dato = models.ForeignKey('TipoDeDato', on_delete=models.CASCADE)
	deleted = models.BooleanField(default=False)

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

	def delete(self):
		self.deleted = True
		self.save()

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
			'tipo_data':self.tipo_de_dato.to_dict()
		}

	def __str__(self):
		return '%s - SEC: %s - PLANT: %s' % (self.titulo, self.seccion.titulo, self.seccion.plantilla.titulo)

class Seccion(models.Model):
	titulo = models.CharField(max_length=200)
	plantilla = models.ForeignKey('Plantilla', on_delete=models.CASCADE)
	deleted = models.BooleanField(default=False)

	@property
	def preguntas(self):
		return Pregunta.objects.filter(seccion=self.pk).order_by('id')

	def crear(self, titulo, plantilla):
		s = Seccion()
		s.titulo = titulo
		s.plantilla = plantilla
		s.save()
		return s

	def delete(self):
		self.deleted = True
		self.save()

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
	estado = models.CharField(max_length=1)
	deleted = models.BooleanField(default=False)

	def crear(self, titulo, descripcion):
		p = Plantilla()
		p.titulo = titulo
		p.descripcion = descripcion
		p.estado = 'i'
		p.save()
		return p

	@property
	def secciones(self):
		return Seccion.objects.filter(plantilla=self.pk).order_by('id')

	def delete(self):
		self.deleted = True
		self.save()

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

class Programa(models.Model):
	nombre = models.CharField(max_length=50)
	plantilla = models.ForeignKey('Plantilla', on_delete=models.CASCADE, blank=True)
	fecha_inicio = models.DateField()
	fecha_fin = models.DateField()
	fecha_envio_paquete = models.DateField()
	fecha_envio_resultados = models.DateField()
	estado = models.BooleanField(default=True)
	deleted = models.BooleanField(default=False)
	
	@property
	def viales(self):
		return Vial.objects.filter(programa=self.pk).order_by('id')

	def crear(self, nombre, plantilla_id, fecha_inicio, fecha_fin, fecha_envio_resultados, fecha_envio_paquete):
		plantilla = None
		if len(Plantilla.objects.filter(pk=plantilla_id)) > 0:
			plantilla = Plantilla.objects.get(pk=plantilla_id)

		try:
			p = Programa()
			p.nombre = nombre
			p.plantilla = plantilla
			p.fecha_inicio = fecha_inicio
			p.fecha_fin = fecha_fin
			p.fecha_envio_paquete = fecha_envio_paquete
			p.fecha_envio_resultados = fecha_envio_resultados
			p.estado = True
			p.save()
			return p
		except:
			return None

	def delete(self):
		self.deleted = True
		self.save()

	def to_dict(self):
		return {
			'id':self.pk,
			'plantilla_id':self.plantilla.id,
			'fecha_inicio':str(self.fecha_inicio),
			'fecha_fin':str(self.fecha_fin),
			'fecha_envio_paquete':str(self.fecha_envio_paquete),
			'fecha_envio_resultados':str(self.fecha_envio_resultados)
		}

	def __str__(self):
		return '%s INICIO: %s' % (self.nombre, str(self.fecha_inicio))
 
class Vial(models.Model):
	codigo = models.CharField(max_length=50, unique=True)
	respuestas = models.TextField(default=None)
	programa = models.ForeignKey('Programa', on_delete=models.CASCADE)
	# plantilla = models.ForeignKey('Plantilla', on_delete=models.CASCADE)
	deleted = models.BooleanField(default=False)

	# def crear(self, codigo, respuestas, programa, plantilla):
	def crear(self, codigo, respuestas, programa):
		v = Vial()
		v.codigo = codigo
		v.respuestas = respuestas
		v.programa = programa
		# v.plantilla = plantilla
		v.save()
		return v

	def editar(self, vial, respuestas):
		try:
			v = vial
			v.respuestas = respuestas
			v.save()
			return v
		except:
			return None

	def delete(self):
		try:
			self.deleted = True
			self.save()
			return True
		except:
			return False

	def to_dict(self):
		if not self.respuestas:
			respuestas = ""
		else:
			respuestas = json.loads(self.respuestas)

		return {
			'id':self.pk,
			'codigo':self.codigo,
			'respuestas':respuestas
		}