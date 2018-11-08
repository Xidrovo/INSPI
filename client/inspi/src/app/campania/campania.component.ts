import { ComponentFactoryResolver, Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Campania } from './campania.model';
import { Router } from '@angular/router';
import { Plantilla } from '../plantillas/plantilla.model'

@Component({
  selector: 'app-campania',
  templateUrl: './campania.component.html',
  styleUrls: ['./campania.component.css']
})
export class CampaniaComponent implements OnInit {

  campaniasArray: Campania[];

  plantillasArray: Plantilla[];

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
        data['programas'].map((p):Campania =>
        {return this.parseCampania(p)}):
        [{id:-1, plantilla_id:-1,fecha_inicio: null,
        fecha_fin: null, fecha_envio_paquete: null,
      fecha_envio_resultados: null}];
      }
    );
  }

  private parseCampania(data: object): Campania{
    return {nombre:data['nombre'],id:data['id'],plantilla_id:data['plantilla_id'],
    fecha_inicio:data['fecha_inicio'],fecha_fin:data['fecha_fin'],
    fecha_envio_paquete:data['fecha_envio_paquete'],
    fecha_envio_resultados:data['fecha_envio_resultados']};
  }

  async guardarCampania() {
    this.campania = {
      plantilla_id : this.plantilla_id,
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

  async eliminarCampania(campania: Campania) {
    await this.apiService.deleteCampania(campania.id);
    const index = this.campaniasArray.findIndex(x => {
      return x.id === campania.id;
    });
    this.campaniasArray.splice(index, 1);
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
    return {id:data['id'], titulo: data['titulo'], descripcion: data['descripcion'], secciones: data['secciones']};
  }

  
}

