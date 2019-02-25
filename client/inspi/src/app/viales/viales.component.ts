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
    vialesArray: any;
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
        let plantilla: any;
        plantilla = await this.apiService.getPlantilla(idPlantilla);
        return plantilla.plantilla;
    }
    async verPlantilla(index) {
        console.log('D:', index);
        this.codigo = this.vialesArray[index].codigo;
        this.currentIndex = index;
        let hasInfo: any;
        hasInfo = await this.getVial(this.codigo);
        this.vial = this.fillInfo(this.plantilla, hasInfo.respuesta);
        $('#respuestaModal')
            .modal()
            .show();
    }
    async getVial(vialCode) {
        return await this.apiService.getVial(vialCode);
    }
    fillInfo(plantilla, res) {
        let respTemp: any;
        const respuestas = plantilla.secciones.map((seccion, indexS) => {
            const respuesta = seccion.preguntas.map((pregunta, indexP) => {
                respTemp = res[indexS].preguntas[indexP].respuesta;
                return this.setJSON(pregunta, respTemp);
            });
            return respuesta;
        });
        return respuestas;
    }
    setJSON = (pregunta, resp) => {
        let respuesta: any;
        if (resp !== null) {
            respuesta = resp;
        } else {
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
            if (pregunta.tipo_data.id.indexOf('tabla') != -1){
                respuesta = {};
            }
        }        
        
        return {
            id: pregunta.id,
            tipo: pregunta.tipo_data.id,
            respuesta: respuesta
        };
    };
    
    /*
  
  async editarVial(id) {      
    var vial = {
      id: id,
      codigo: this.codigo,
      respuestas: {}
    }
    await this.apiService.setVial(vial);
  }
  */

    async eliminarVial(vial: any) {
        await this.apiService.deleteVial(this.idPrograma, vial.codigo);
        const index = this.vialesArray.findIndex(x => {
            return x.codigo === vial.codigo;
        });
        this.vialesArray.splice(index, 1);
    }
    async crearVial() {
        var vial = {
            codigo: this.codigo,
            respuestas: this.parseToAnArray(this.vial)
        };
        this.vialesArray[this.currentIndex] = vial;
        await this.apiService.setVial(vial);
        $('#respuestaModal').modal('hide');
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
            codigo: this.codigo,
            respuestas: {}
        };
        var respuesta = await this.apiService.addVial(vial, this.idPrograma);
        
        if (respuesta['error']==0){
            location.reload();
        } else {
            alert("El codigo del vial ya existe");
        }
        
    }
    handleUnica(target, seccionIndex, preguntaIndex) {
        this.vial[seccionIndex][preguntaIndex].respuesta = {
            value: target.value,
            name: target.options[target.selectedIndex].innerText
        };
    }
}
