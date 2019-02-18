import {
    Component,
    OnInit,
    NgModule,
    ComponentFactoryResolver,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { ApiService } from '../api.service';
import { PlantillaEditorComponent } from '../plantillas/plantilla-editor/plantilla-editor.component';

declare var $: any;
@NgModule({
    exports: [AgregarSeccionComponent],
    entryComponents: [AgregarSeccionComponent]
})
@Component({
    selector: 'app-agregar-seccion',
    templateUrl: './agregar-seccion.component.html',
    styleUrls: ['./agregar-seccion.component.css']
})
export class AgregarSeccionComponent implements OnInit {
    private title: String = '<Título aquí>';
    private index: Number = 0;
    private arrayPreguntas: any[] = [];

    private titulo = '';
    private descripcion = '';
    private tipo_data = { id: '-1', nombre: '' };
    private requerido = false;
    private detalle = '';
    private tipoDatos: any;
    private editIndex = 0;
    private onEdit: Boolean = false;
    //private dato = '';

    private filled: Boolean = false;

    @Output()
    deleteClick: EventEmitter<String> = new EventEmitter<String>();

    @Output()
    subirSeccion: EventEmitter<String> = new EventEmitter<String>();

    @Output()
    bajarSeccion: EventEmitter<String> = new EventEmitter<String>();

    constructor(private apiService: ApiService) {}
    ngOnInit() {
        this.tipoDatos = this.apiService
            .getTipoDeDatos()
            .subscribe((data: Array<object>) => {
                this.tipoDatos = data;
            });
    }
    setTitle(title) {
        this.title = title;
    }

    setIndex(index) {
        this.index = index;
    }
    setPreguntas(preguntas) {
        this.arrayPreguntas = preguntas;
    }
    eliminar(event, index) {
        this.deleteClick.emit(index);
    }

    subirS(event, index) {
        this.subirSeccion.emit(index);
    }

    bajarS(event, index) {
        this.bajarSeccion.emit(index);
    }

    addInfo(titulo, pregunta) {
        const info = {
            titulo: this.titulo,
            tipo_data: this.tipo_data,
            requerido: this.requerido,
            detalle: this.splitDetalle(this.detalle),
            descripcion: this.descripcion
            //dato: this.dato
        };
        console.log('===detalle', info.detalle);
        if (this.onEdit) {
            this.arrayPreguntas[this.editIndex] = info;
            this.onEdit = false;
        } else {
            this.arrayPreguntas.push(info);
        }
        $('#preguntasModal' + this.index).modal('hide');
        this.cleanModal();
    }
    splitDetalle(detalle) {
        if (
            this.tipo_data.id != 'seleccion_unica' &&
            this.tipo_data.id != 'seleccion_multiple'
        ) {
            return detalle;
        }
        let detail = Array();
        if (detalle !== null && detalle !== undefined) {
            detalle = detalle.split('\n');
            detalle.forEach((element, i) => {
                console.log('===detalle, splited', element, i);
                detail.push({ value: i, name: element });
            });
            return detail;
        }
        return '';
    }
    getInfo() {
        return { titulo: this.title, preguntas: this.arrayPreguntas };
    }
    isArrayEmpty() {
        return this.arrayPreguntas.length === 0;
    }
    onSelectChange() {
        $('#preguntasModal' + this.index).modal('show');
        this.tipo_data.nombre = $(
            '#sel' + this.index + ' option:selected'
        ).text();
    }

    borrarPregunta(index) {
        this.arrayPreguntas.splice(index, 1);
    }

    editarPregunta(index) {
        this.editIndex = index;
        this.onEdit = true;
        var info = this.arrayPreguntas[index];
        this.titulo = info['titulo'];
        this.tipo_data = info['tipo_data'];
        this.requerido = info['requerido'];
        this.detalle = this.parseDetalle(info['detalle']);
        this.descripcion = info['descripcion'];
        $('#preguntasModal' + this.index).modal('show');
    }

    parseDetalle(detalle: any): string {
        console.log('Detalle: ', detalle);
        var ndetalle = '';
        if (
            this.tipo_data.id == 'seleccion_unica ' ||
            this.tipo_data.id == 'seleccion_multiple'
        ) {
            var size = detalle.length;
            detalle.forEach((element, i) => {
                ndetalle = ndetalle.concat(
                    element['name'].concat(i < size - 1 ? '\n' : '')
                );
                console.log('Ndetale name: ', ndetalle);
            });
        } else {
            ndetalle = '' + detalle;
        }
        console.log('Detalle resul: ', ndetalle);
        return ndetalle;
    }

    cancelAction() {
        this.onEdit = false;
        this.cleanModal();
    }

    cleanModal() {
        this.titulo = '';
        this.tipo_data = { id: '-1', nombre: '' };
        this.requerido = false;
        this.detalle = '';
        this.descripcion = '';
    }

    

    

    subir(indice){
        if (indice == 0){
            console.log("desctivado");
        } else {
            let auxiliar = this.arrayPreguntas[indice - 1];
            this.arrayPreguntas[indice - 1] = this.arrayPreguntas[indice];
            this.arrayPreguntas[indice] = auxiliar;
        }

    }

    bajar(indice){
        if (indice == this.arrayPreguntas.length - 1 ){
            console.log("desctivado");
        } else {
            let auxiliar = this.arrayPreguntas[indice + 1];
            this.arrayPreguntas[indice + 1] = this.arrayPreguntas[indice];
            this.arrayPreguntas[indice] = auxiliar;
        }

    }

    



    validate() {
        if (this.tipo_data.id == 'seleccion_multiple') {
            this.filled = !!this.titulo && !!this.descripcion && !!this.detalle;
        } else if (this.tipo_data.id == 'seleccion_unica') {
            this.filled = !!this.titulo && !!this.descripcion && !!this.detalle;
        } else {
            this.filled = !!this.titulo && !!this.descripcion;
        }
    }
}
