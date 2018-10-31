import { ComponentFactoryResolver, Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Campania } from './campania.model';
import { Router } from '@angular/router';
import { Plantilla } from '../plantillas/plantilla.model'
import { Pregunta } from '../plantillas/pregunta.model';
import { Seccion } from '../plantillas/seccion.model';

import { PlantillasHomeComponent } from '../plantillas/plantillas-home/plantillas-home.component';

@Component({
  selector: 'app-campania',
  templateUrl: './campania.component.html',
  styleUrls: ['./campania.component.css']
})
export class CampaniaComponent implements OnInit {

  campaniasArray: Campania[]
  plantillasArray: Plantilla[]

  private campania: any;
  private nombre: string;
  private plantilla_id: number;
	private fecha_inicio: Date;
	private fecha_fin: Date;
	private fecha_envio_paquete: Date; 
	private fecha_envio_resultados: Date;


  constructor(
    private apiService: ApiService,
    private resolver: ComponentFactoryResolver,
    private _router: Router) { }

  ngOnInit() {
    this.obtenerPlantillas();
    this.obtenerCampanias(); 
    
  }

  obtenerCampanias(){
    this.apiService.getCampanias()
    .subscribe(
      (data: object) => {
        this.campaniasArray = data['error']==0?
        data['campanias'].map((p):Campania =>
        {return this.parseCampania(p)}):
        [{id:-1, plantilla_id:-1,fecha_inicio: null,
        fecha_fin: null, fecha_envio_paquete: null,
      fecha_envio_resultados: null}];
      }
    );
  }

  private parseCampania(data: object): Campania{
    return this.generateSchemaForm2({nombre:data['nombre'],id:data['id'],plantilla_id:data['plantilla_id'],
    fecha_inicio:data['fecha_inicio'],fecha_fin:data['fecha_fin'],
    fecha_envio_paquete:data['fecha_envio_paquete'],
    fecha_envio_resultados:data['fecha_envio_resultados']});
  }

  private generateSchemaForm2(campania: Campania): Campania {
    return campania;
  }

  async guardarCampania() {
    this.campania = {
      plantilla_id: this.plantilla_id,
      nombre: this.nombre,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
      fecha_envio_paquete: this.fecha_envio_paquete,
      fecha_envio_resultados: this.fecha_envio_resultados
    };
    console.log(this.campania);
    await this.apiService.addCampania(this.campania);
    this._router.navigate(['/programas']);
  }

  obtenerPlantillas() {    
    this.apiService.getPlantillas()
      .subscribe(
        (data: object) => {
          this.plantillasArray = data['error']==0?
           data['plantillas'].map((p):Plantilla=>
           {return this.parsePlantilla(p)}) : 
           [{id:-1,titulo:"",descripcion:data['msg'],
           secciones:[]}];          
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
        var flag = pregunta.tipo['nombre'].search('seleccion')!=-1;
        var formpregunta = {
          "key": "p"+pregunta.id+"-"+seccion.id,
          "type": datatype[pregunta.tipo['nombre']]['form'],
          "titleMap": flag?pregunta.detalle:[],
          "feedback": true,
          "labelHtmlClass": "col-md-12",
          "fieldHtmlClass": flag?"":"col-md-6"
        };
        if (flag){
          formpregunta['title'] = pregunta.titulo;
          /*
          properties["p"+pregunta.id+"-"+seccion.id] = {            
            "description": pregunta.descripcion        
          };*/
        } else{
          properties["p"+pregunta.id+"-"+seccion.id] = {
            "title": pregunta.titulo,
            "description": pregunta.descripcion,
            "type": datatype[pregunta.tipo['nombre']]['schema']          
          };
        }
        
        if (pregunta.requerido) {
          schema['required'].push("p"+pregunta.id+"-"+seccion.id);
        }
        items.push(formpregunta);
      });
      
      sec['items'] = items;
      form.push(sec);
      
    });
    schema['properties'] = properties;
    plantilla['schema'] = schema; plantilla['form'] = form;
    
    return plantilla;
  }




}

