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
    }
}
