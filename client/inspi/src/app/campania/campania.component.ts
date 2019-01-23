import { ComponentFactoryResolver, Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { Globals } from '../globals';
import { Campania } from './campania.model';
import { Router } from '@angular/router';
import { Plantilla } from '../plantillas/plantilla.model';
import { formatDate } from '@angular/common';


declare var $: any;

@Component({
    selector: 'app-campania',
    templateUrl: './campania.component.html',
    styleUrls: ['./campania.component.css']

})


export class CampaniaComponent implements OnInit {
    programaSelected: Campania = {id: -1, nombre: "",plantilla_id: -1,plantilla_nombre: null,
        fecha_inicio: null,fecha_fin: null,fecha_envio_paquete: null,fecha_envio_resultados: null};
    campaniasArray: Campania[];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    plantillasArray: Plantilla[];

    
    private campania: any;
    private nombre: string = '';
    private plantilla_id: number = -1;    
    private fecha_inicio: Date = null;
    private fecha_fin: Date = null;
    private fecha_envio_paquete: Date = null;
    private fecha_envio_resultados: Date = null;

    public today: number = Date.now();

    constructor(
        private apiService: ApiService,
        private globals: Globals,
        private _router: Router
    ) {}


    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            columnDefs: [
                { orderable: false, targets: 0 },
                { orderable: false, targets: 1 },
                { orderable: false, targets: 2 }
            ]
        };
        this.obtenerPlantillas();
        this.obtenerCampanias();
        
    }

    obtenerCampanias() {
        this.apiService.getCampanias().subscribe((data: object) => {
            this.campaniasArray =
                data['error'] == 0
                    ? data['programas'].map(
                          (p): Campania => {
                              return this.parseCampania(p);
                          }
                      )
                    : [
                          {
                              nombre: "Error",
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
        var newProgram:any = {
            plantilla_id: this.plantilla_id,
            nombre: this.nombre,
            fecha_inicio: this.fecha_inicio,
            fecha_fin: this.fecha_fin,
            fecha_envio_paquete: this.fecha_envio_paquete,
            fecha_envio_resultados: this.fecha_envio_resultados
        };

        var result = await this.apiService.addCampania(newProgram);
        if (result.error == 0){
            newProgram['id'] = result.programa_id;
        }

        // HAY QUE HACER QUE RECARGUE LA PAGINA PARA QUE APAREZCA EL PROGRAMA CREADO
        //this.campaniasArray.push(newProgram);
        $('#tblProgramas').DataTable().row.add([
            newProgram.nombre, "Del "+formatDate(newProgram.fecha_inicio, 'MMM d, yyyy', 'en-US')+" al "+formatDate(newProgram.fecha_fin, 'MMM d, yyyy', 'en-US'), "botones :v"
        ]).draw();
            
        
    }

    async eliminarCampania(campania: Campania) {
        await this.apiService.deleteCampania(campania.id);
        const index = this.campaniasArray.findIndex(x => {
            return x.id === campania.id;
        });
        this.campaniasArray.splice(index, 1);
    }


    verPrograma(programa) {
        this.programaSelected = programa;
        $('#vistaprevia').modal().show();
    }

    editarPrograma(programa) {
        this.programaSelected = programa;
        $('#modaleditar').modal().show();
    }

    /*
    editarPrograma(campania) {
        this.fecha_inicio = campania.fecha_inicio;
        this.fecha_fin = campania.fecha_fin;
        this.fecha_envio_paquete = campania.fecha_envio_paquete;
        this.fecha_envio_resultados = campania.fecha_envio_resultados;

        this.nombre = campania['nombre'];
        $('#idE' + campania.id).modal('show');
        // ELIMINAR EL ROW DEL DATATABLE #tblProgramas
        $('#tblProgramas')
            .DataTable()
            .draw();
    }
    */

    async setPrograma(programa) {
                
        const editCampania = {
            fecha_envio_paquete: programa.fecha_envio_paquete,
            fecha_envio_resultados: programa.fecha_envio_resultados,
            fecha_fin: programa.fecha_fin,
            fecha_inicio: programa.fecha_inicio,
            id: programa.id,
            nombre: programa.nombre,
            plantilla_id: programa.plantilla_id,
            plantilla_nombre: programa.plantilla_nombre
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
                    : [];
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

    verViales(programa){                
        this._router.navigate(['/programas/'+programa['id']+'/viales']);
    }

    isInvalid() {
        if (this.nombre == "" || this.nombre.length < 5 || this.nombre.length > 100 || this.plantilla_id == null ) {
            return true;
        } else {
            return false;
        }
    }

    isActive1() {
        if (this.fecha_inicio) {
            return false;
        } else {
            
            return true;
        }
    }

    isActive2() {
        if (this.fecha_inicio == null || this.fecha_fin == null) {
            return true;
        } else {
            return false;
        }
    }

  



    
}
