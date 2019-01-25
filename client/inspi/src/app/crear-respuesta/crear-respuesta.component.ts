import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

declare var $: any;
@Component({
    selector: 'app-crear-respuesta',
    templateUrl: './crear-respuesta.component.html',
    styleUrls: ['./crear-respuesta.component.css']
})
export class CrearRespuestaComponent implements OnInit {
    constructor(private apiService: ApiService) {
        this.obtenerPlantillas();
    }
    plantillasArray: any;
    currentPlantilla: any;
    viales: any;

    ngOnInit() {}

    async obtenerPlantillas() {
        await this.apiService.getPlantillas().subscribe((data: object) => {
            try {
                this.plantillasArray = data;
            } catch (error) {}
        });
    }
    verPlantilla(plantilla) {
        this.currentPlantilla = plantilla;
        $('#respuestaModal')
            .modal()
            .show();
        this.fillInfo(this.currentPlantilla);
    }
    fillInfo(plantilla) {
        plantilla.secciones.map(seccion => {
            this.viales = seccion.preguntas.map(pregunta => {
                return this.setJSON(pregunta);
            });
        });
        console.log('====:(', this.viales);
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
        return { id: pregunta.id, code: 'hola', respuesta: respuesta };
    };
    guardarRespuesta = () => {};
}
