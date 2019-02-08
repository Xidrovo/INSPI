"""inspi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from api import views
from api.views import PlantillaView, ProgramaView, VialView

urlpatterns = [
   re_path(r'^plantillas/(?P<plantilla_id>[0-9]*|)$', PlantillaView.as_view(), name='plantillas'),
   re_path(r'^programas/(?P<programa_id>[0-9]*|)$', ProgramaView.as_view(), name='programas'),
   re_path(r'^programas/viales/(?P<programa_id>[0-9]*|)$', views.get_viales, name='programa_viales'),
   re_path(r'^programas/plantilla/(?P<programa_id>[0-9]*|)$', views.get_programa_plantilla, name='programa_plantilla'),
   re_path(r'^viales/(?P<programa_id>[0-9]*|)$', VialView.as_view(), name='viales'),
   path('vial/respuesta/<codigo>/', views.get_respuestas_viales, name='respuestas_viales'),
   path('vial/ver/<programa_id>/', views.get_viales, name='get_viales'),
   path('tipos_de_dato/', views.get_tipos_de_dato, name='tipos_de_dato'),
]