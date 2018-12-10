import { ComponentFactoryResolver, Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { Campania } from './campania.model';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { Plantilla } from '../plantillas/plantilla.model';

declare var $: any;

@Component({
    selector: 'app-campania',
    templateUrl: './campania.component.html',
    styleUrls: ['./campania.component.css']
})
export class CampaniaComponent implements OnInit {
    campaniasArray: Campania[];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    plantillasArray: Plantilla[];

    private campania: any;
    private nombre: string = '';
    private plantilla_id: number = -1;
    private plantilla_nombre: string = '';
    private fecha_inicio: Date = null;
    private fecha_fin: Date = null;
    private fecha_envio_paquete: Date = null;
    private fecha_envio_resultados: Date = null;
    

    constructor(
        private apiService: ApiService,
        private globals: Globals,
        private resolver: ComponentFactoryResolver,
        private _router: Router
    ) {}

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            columnDefs: [{orderable: false, targets: 0},{orderable: false, targets: 1},{orderable: false, targets: 2}]
        };
        this.obtenerPlantillas();
        this.obtenerCampanias();
    }

    obtenerCampanias() {
        this.apiService.getCampanias().subscribe((data: object) => {
            this.campaniasArray =
                data['error'] == 0
                    ? data['programas'].map((p): Campania => {
                              return this.parseCampania(p);
                          }
                      )
                    : [
                          {
                              id: -1,
                              plantilla_id: -1,
                              plantilla_nombre: null,
                              fecha_inicio: null,
                              fecha_fin: null,
                              fecha_envio_paquete: null,
                              fecha_envio_resultados: null
                          }
                      ];
            this.dtTrigger.next();
        });
    }

    private parseCampania(data: object): Campania {
        return {
            nombre: data['nombre'],
            id: data['id'],
            plantilla_id: data['plantilla_id'],
            plantilla_nombre: data['plantilla_nombre'],
            fecha_inicio: data['fecha_inicio'],
            fecha_fin: data['fecha_fin'],
            fecha_envio_paquete: data['fecha_envio_paquete'],
            fecha_envio_resultados: data['fecha_envio_resultados']
        };
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

        // HAY QUE HACER QUE RECARGUE LA PAGINA PARA QUE APAREZCA EL PROGRAMA CREADO
        this.campaniasArray.push(this.campania);
        $('#tblProgramas').DataTable().draw();
        
        await this.apiService.addCampania(this.campania); 
        
    }

    async eliminarCampania(campania: Campania) {
        await this.apiService.deleteCampania(campania.id);
        const index = this.campaniasArray.findIndex(x => {
            return x.id === campania.id;
        });
        this.campaniasArray.splice(index, 1);

        // ELIMINAR EL ROW DEL DATATABLE #tblProgramas
        $('#tblProgramas').DataTable().draw();
    }

    async editarCampania(campania) {
        //this.campania = await this.apiService.getCampania(id);
        console.log(campania.fecha_envio_paquete);
        const editCampania = {
            fecha_envio_paquete: campania.fecha_envio_paquete,
            fecha_envio_resultados: campania.fecha_envio_resultados,
            fecha_fin: campania.fecha_fin,
            fecha_inicio: campania.fecha_inicio,
            id: campania.id,
            nombre: campania.nombre,
            plantilla_id: campania.plantilla_id,
            plantilla_nombre: campania.plantilla_nombre
        };

        await this.apiService.setCampania(editCampania);
        //this.globals.currentTemplate = this.campania;
        //$('#idE' + campania.id).modal().hide();
    }

    obtenerPlantillas() {
        this.apiService.getPlantillas().subscribe((data: object) => {
            this.plantillasArray =
                data['error'] == 0
                    ? data['plantillas'].map(
                          (p): Plantilla => {
                              return this.parsePlantilla(p);
                          }
                      )
                    : [
                          {
                              id: -1,
                              titulo: '',
                              descripcion: data['msg'],
                              secciones: []
                          }
                      ];
        });
    }

    private parsePlantilla(data: object): Plantilla {
        return {
            id: data['id'],
            titulo: data['titulo'],
            descripcion: data['descripcion'],
            secciones: data['secciones']
        };
    }

}
