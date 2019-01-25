import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';

import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-viales',
    templateUrl: './viales.component.html',
    styleUrls: ['./viales.component.css']
})
export class VialesComponent implements OnInit {
    vialesArray: Object[];
    vial: any;
    codigo: any;
    idPrograma;
    plantilla: any;
    currentIndex: number;

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            columnDefs: [
                { orderable: true, targets: 0, className: 'col-md-9' },
                { orderable: false, targets: 1 }
            ]
        };
        this.route.paramMap.subscribe(params => {
            this.idPrograma = params.get('id');
            this.obtenerViales(this.idPrograma);
        });
    }
    ngOnDestroy() {
        this.dtTrigger.unsubscribe();
    }

    async obtenerViales(idPrograma) {
        await this.apiService
            .getViales(idPrograma)
            .subscribe((data: object) => {
                this.vialesArray =
                    data['error'] == 0
                        ? data['viales']
                        : [
                              {
                                  id: -1,
                                  codigo: ''
                              }
                          ];
                this.dtTrigger.next();
            });
        const programa = await this.obtenerPrograma(idPrograma);
        this.plantilla = await this.obtenerPlantilla(programa.plantilla_id);
    }
    async obtenerPrograma(idPrograma) {
        return await this.apiService.getCampania(idPrograma);
    }
    async obtenerPlantilla(idPlantilla) {
        const plantilla = await this.apiService.getPlantilla(idPlantilla);
        return plantilla.plantilla;
    }
    async verPlantilla(index) {
        console.log('index!', index);
        this.codigo = this.vialesArray[index].codigo;
        this.currentIndex = index;
        const hasInfo = await this.getVial(this.codigo);
        if (this.vialesArray[index].respuestas === undefined) {
            if (hasInfo.respuesta[0] === undefined) {
                this.vial = this.fillInfo(this.plantilla);
            } else {
                this.vial = hasInfo.respuesta;
            }
        } else {
            this.vial = this.vialesArray[index].respuestas;
        }
        $('#respuestaModal')
            .modal()
            .show();
    }
    async getVial(vialCode) {
        return await this.apiService.getVial(vialCode);
    }
    fillInfo(plantilla) {
        const respuestas = plantilla.secciones.map(seccion => {
            const respuesta = seccion.preguntas.map(pregunta => {
                return this.setJSON(pregunta);
            });
            return respuesta;
        });
        return respuestas;
    }
    setJSON = pregunta => {
        let respuesta: any;
        switch (pregunta.tipo_data.id) {
            case 'seleccion_unica':
                //value, name
                respuesta = { value: '', name: '' };
                break;
            case 'seleccion_multiple':
                //[value, name]
                respuesta = [{ value: '', name: '' }];
                break;
            case 'texto':
                //value
                respuesta = '';
                break;
            case 'rango':
                //min, max
                respuesta = { min: 0, max: 0 };
                break;
            default:
                break;
        }
        return {
            id: pregunta.id,
            tipo: pregunta.tipo_data.id,
            respuesta: respuesta
        };
    };
    /*
  async eliminarVial(vial: Object) {
    await this.apiService.deleteVial(vial['id']);
    const index = this.vialesArray.findIndex(x => {
        return x['id'] === vial['id'];
    });
    this.vialesArray.splice(index, 1);
  }
  
  async editarVial(id) {      
    var vial = {
      id: id,
      codigo: this.codigo,
      respuestas: {}
    }
    await this.apiService.setVial(vial);
  }
  */

    async crearVial() {
        var vial = {
            codigo: this.codigo,
            respuestas: this.parseToAnArray(this.vial)
        };
        this.vialesArray[this.currentIndex] = vial;
        console.log(vial);
        await this.apiService.addVial(vial, this.idPrograma);
        // this.vialesArray.push(vial);
    }
    parseToAnArray(array) {
        let newArray = [];
        array.map(seccion => {
            seccion.map(respuesta => {
                newArray.push(respuesta);
                return respuesta;
            });
        });
        return newArray;
    }
    async pushVial() {
        var vial = {
            idPrograma: this.idPrograma,
            codigo: this.codigo,
            respuestas: {}
        };
        await this.apiService.addVial(vial);
        this.vialesArray.push(vial);
    }
    handleUnica(target, seccionIndex, preguntaIndex) {
        this.vial[seccionIndex][preguntaIndex].respuesta = {
            value: target.value,
            name: target.options[target.selectedIndex].innerText
        };
    }
}
