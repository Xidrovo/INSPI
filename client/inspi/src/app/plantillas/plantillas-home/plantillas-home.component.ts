import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Globals } from '../../globals';
import { ApiService } from '../../api.service';
import { Plantilla } from '../plantilla.model';
import { Pregunta } from '../pregunta.model';
import { Seccion } from '../seccion.model';

import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-plantillas-home',
    templateUrl: './plantillas-home.component.html',
    styleUrls: ['./plantillas-home.component.css']
})
export class PlantillasHomeComponent implements OnInit {
    plantillasArray: Plantilla[];
    plantilla: any;
    plantillaShowed: Plantilla = {
        id: -1,
        titulo: '',
        descripcion: '',
        secciones: []
    };
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    constructor(
        private apiService: ApiService,
        private globals: Globals,
        private route: ActivatedRoute,
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
    }

    ngOnDestroy() {
        this.dtTrigger.unsubscribe();
    }

    crearPlantilla() {
        console.log('Crear plantilla');
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
            this.dtTrigger.next();
        });
    }

    public parsePlantilla(data: object): Plantilla {
        // Parsear secciones...
        var secciones = data['secciones'].map(
            (s): Seccion => {
                return this.parseSeccion(s);
            }
        );

        return {
            id: data['id'],
            titulo: data['titulo'],
            descripcion: data['descripcion'],
            secciones: secciones
        };
    }

    private parseSeccion(data: object): Seccion {
        // Parsear preguntas...
        var preguntas = data['preguntas'].map(
            (pr): Pregunta => {
                return this.parsePregunta(pr);
            }
        );

        return {
            id: data['id'],
            titulo: data['titulo'],
            preguntas_seccion: preguntas
        };
    }

    private parsePregunta(data: object): Pregunta {        
        return {
            id: data['id'],
            titulo: data['titulo'],
            requerido: data['requerido'],
            descripcion: data['descripcion'],
            detalle: data['detalle'],
            tipo: data['tipo_data']
        };
    }

    // Making it async, so we can show if there's a new error or not.
    async eliminarPlantilla(plantilla: Plantilla) {
        await this.apiService.deletePlantilla(plantilla.id);
        const index = this.plantillasArray.findIndex(x => {
            return x.id === plantilla.id;
        });
        this.plantillasArray.splice(index, 1);
    }

    async editarPlantilla(id) {
        this.plantilla = await this.apiService.getPlantilla(id);
        this.globals.currentTemplate = this.plantilla;
        this._router.navigate(['/plantillas/plantilla-editor/-1']);
    }

    public verPlantilla(plantilla: Plantilla) {
        this.plantillaShowed = plantilla;
        $('#vistaprevia')
            .modal()
            .show();
    }
}
