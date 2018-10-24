import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api.service';
import { Plantilla } from '../plantilla.model';
import { Pregunta } from '../pregunta.model';
import { Seccion } from '../seccion.model';
@Component({
  selector: 'app-plantillas-home',
  templateUrl: './plantillas-home.component.html',
  styleUrls: ['./plantillas-home.component.css']
})
export class PlantillasHomeComponent implements OnInit {
  
  plantillasArray: Plantilla[];
  
  constructor(private apiService: ApiService) {}  

  ngOnInit() {
    this.obtenerPlantillas();    
  }

  crearPlantilla() {
    console.log('Crear plantilla');
  }
/*
  obtenerPlantillas() {
    this.plantillasArray = this.apiService
      .getPlantillas()
      .subscribe((data: Array<object>) => {
        this.plantillasArray = data;
      });
  }
*/
  obtenerPlantillas() {    
    this.apiService.getPlantillas()
      .subscribe(
        (data: object) => {
          this.plantillasArray = data['error']==0? data['plantillas'].map((p):Plantilla=>{return this.parsePlantilla(p)}) : [{id:-1,titulo:"",descripcion:data['msg'],secciones:[]}];          
        }
      );
  }

  private parsePlantilla(data: object): Plantilla{          
      // Parsear secciones...      
    var secciones = data['secciones'].map((s): Seccion=>{return this.parseSeccion(s)});
                    
    return this.generateSchemaForm({id:data['id'], titulo: data['titulo'], descripcion: data['descripcion'], secciones: secciones});
  }

  private parseSeccion(data: object): Seccion {
    // Parsear preguntas...
    var preguntas = data['preguntas'].map((pr): Pregunta=>{return this.parsePregunta(pr)});

    return {id: data['id'], titulo: data['titulo'], preguntas_seccion: preguntas};
  }

  private parsePregunta(data: object): Pregunta {
    return {id: data['id'], titulo: data['titulo'], requerido: data['requerido'], descripcion: data['descripcion'], detalle: data['detalle'], tipo: data['tipo_data']};
  }

  private generateSchemaForm(plantilla: Plantilla): Plantilla {
    var schema = {};
    var form = [];
    // Definicion de tipos de datos para schema-form
    var datatype = {'texto':{'schema':'string', 'form':'text'},
  'rango':{'schema':'number', 'form':'number'},
  'valor_exacto':{'schema':'number', 'form':'number'},
  'seleccion_unica':{'schema':'string', 'form':'radios'},
  'seleccion_multiple':{'schema':'string', 'form':'checkboxes'}};

    schema['type'] = "object"; schema['title'] = plantilla.titulo; schema['required'] = [];
    form.push({
      "type": "help",
      "helpvalue": "<div class=\"alert alert-info\">"+plantilla.descripcion+"</div>"
    });

    var properties = {};    
    plantilla.secciones.forEach((seccion) => {
      var sec = {};
      var items = [];
      sec['type'] = "section";
      sec['htmlClass'] = "seccion-container";
      items.push({
        "type": "help",
        "htmlClass": "col-md-12",
        "helpvalue": "<h5 class='section-title'>"+seccion.titulo+"</h5><hr>"
      });
      
      seccion.preguntas_seccion.forEach((pregunta) => {
        items.push({
          "key": "p"+pregunta.id+"-"+seccion.id,
          "type": datatype[pregunta.tipo['nombre']]['form'],
          "titleMap": pregunta.tipo['nombre'].search('seleccion')!=-1?pregunta.detalle:[],
          "feedback": true
        });
        properties["p"+pregunta.id+"-"+seccion.id] = {
          "title": pregunta.titulo,
          "description": pregunta.descripcion,
          "type": datatype[pregunta.tipo['nombre']]['schema']          
        };
        if (pregunta.requerido) {
          schema['required'].push("p"+pregunta.id+"-"+seccion.id);
        }
      });
      
      sec['items'] = items;
      form.push(sec);
      
    });
    schema['properties'] = properties;
    plantilla['schema'] = schema; plantilla['form'] = form;
    
    console.log("Plantilla SF");
    console.log(plantilla);
    return plantilla;
  }

  // Making it async, so we can show if there's a new error or not.
  async eliminarPlantilla(plantilla: Plantilla) {
    await this.apiService.deletePlantilla(plantilla.id);
    const index = this.plantillasArray.findIndex(x => {
      return x.id === plantilla.id;
    });
    this.plantillasArray.splice(index, 1);
  }
}
