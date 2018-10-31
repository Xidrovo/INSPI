import { ComponentFactoryResolver, Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Campania } from './campania.model';
import { Router } from '@angular/router';
import { PlantillasHomeComponent } from '../plantillas/plantillas-home/plantillas-home.component';


@Component({
  selector: 'app-campania',
  templateUrl: './campania.component.html',
  styleUrls: ['./campania.component.css']
})
export class CampaniaComponent implements OnInit {

  campaniasArray: Campania[]

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
    return this.generateSchemaForm({nombre:data['nombre'],id:data['id'],plantilla_id:data['plantilla_id'],
    fecha_inicio:data['fecha_inicio'],fecha_fin:data['fecha_fin'],
    fecha_envio_paquete:data['fecha_envio_paquete'],
    fecha_envio_resultados:data['fecha_envio_resultados']});
  }

  private generateSchemaForm(campania: Campania): Campania {
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

}

