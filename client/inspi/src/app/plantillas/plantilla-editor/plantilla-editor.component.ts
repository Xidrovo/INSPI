import {
    Component,
    ComponentFactoryResolver,
    ViewContainerRef,
    ViewChild,
    NgModule,
    Input
} from '@angular/core';
import { AgregarSeccionComponent } from '../../agregar-seccion/agregar-seccion.component';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlantillasHomeComponent } from '../plantillas-home/plantillas-home.component';
import { Plantilla } from '../plantilla.model';
import { Globals } from '../../globals';

declare var $: any;

@Component({
    selector: 'app-plantilla-editor',
    templateUrl: './plantilla-editor.component.html',
    styleUrls: ['./plantilla-editor.component.css'],
    entryComponents: [AgregarSeccionComponent]
})
export class PlantillaEditorComponent {
    private title: string;
    plantilla: Plantilla;
    private payload: any = [];
    private titulo: string;
    private descripcion: string;
    private canPost = false;
    refsArray: any[] = [];
    editMode = false;
    @ViewChild('seccionContainer', { read: ViewContainerRef })
    container;
    constructor(
        private resolver: ComponentFactoryResolver,
        private apiService: ApiService,
        private route: ActivatedRoute,
        private _router: Router,
        private globals: Globals
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            if (params.get('id') == '-1') {
                this.editMode = true;
                this.plantilla = this.globals.currentTemplate.plantilla;
                this.titulo = this.plantilla.titulo;
                this.descripcion = this.plantilla.descripcion;
                this.plantilla.secciones.map(seccion => {
                    this.getSeccion(seccion);
                });
            }
        });
    }
    parsePlantilla(data: any): Plantilla {
        if (data['error'] == 0) {
            this.titulo = data['titulo'];
            this.descripcion = data['descripcion'];
            console.log('Plantilla obtenida: ', this.titulo);
            return {
                id: data['id'],
                titulo: data['titulo'],
                descripcion: data['descripcion'],
                secciones: data['secciones']
            };
        } else {
            return { id: 0, titulo: '', descripcion: '', secciones: [] };
        }
    }

    getSeccion(seccion) {
        const factory = this.resolver.resolveComponentFactory(
            AgregarSeccionComponent
        );
        const componentRef = this.container.createComponent(factory);

        componentRef._component.setIndex(this.refsArray.length);
        componentRef._component.setTitle(seccion.titulo);
        componentRef._component.setPreguntas(seccion.preguntas);
        // De esta forma agregamos qué hacer cuando el evento 'deleteClick' sea disparado
        componentRef.instance.deleteClick.subscribe(() => {
            this.eliminarAlgo(componentRef._component.index);
        });
        this.refsArray.push(componentRef);
        this.validate();
        this.title = '';
    }

    // Agrega una nueva sección, llamando al componente AgregarSeccionComponent
    addSeccion() {
        // don't do anything if is empty
        if (!!!this.title) {
            return;
        }
        // Creo una clase de tipo AgregarSeccionComponent
        const factory = this.resolver.resolveComponentFactory(
            AgregarSeccionComponent
        );
        const componentRef = this.container.createComponent(factory);

        componentRef._component.setIndex(this.refsArray.length);
        componentRef._component.setTitle(this.title);
        // De esta forma agregamos qué hacer cuando el evento 'deleteClick' sea disparado
        componentRef.instance.deleteClick.subscribe(() => {
            this.eliminarAlgo(componentRef._component.index);
        });
        this.refsArray.push(componentRef);
        this.validate();
        this.title = '';
        $('#seccionModal').modal('hide');
    }

    // Esta función elimina la última referencia de sección agregada.
    deleteLastSeccion() {
        const componentRef = this.refsArray.pop();
        componentRef.destroy();
        this.validate();
    }
    // Elimina el componente del DOM y del array de Ref dado un índice.
    eliminarAlgo(index) {
        const componentRef = this.refsArray[index];
        componentRef.destroy();
        this.refsArray.splice(index, 1);
        this.reCalculateIndex();
        this.validate();
    }
    // resetea el índice de cada elemento
    reCalculateIndex() {
        let cont = 0;
        this.refsArray.forEach(function(value) {
            value._component.setIndex(cont);
            cont++;
        });
    }
    // realizar un post a la api para almacenar la plantilla
    async guardarPlantilla() {
        this.refsArray.forEach(x => {
            this.payload.push(x._component.getInfo());
        });
        this.plantilla = {
            id: 0,
            titulo: this.titulo,
            descripcion: this.descripcion,
            secciones: this.payload
        };
        if (this.editMode) {
            this.plantilla.id = this.globals.currentTemplate.plantilla.id;
            await this.apiService.setPlantilla(this.plantilla);
        } else {
            await this.apiService.addPlantilla(this.plantilla);
        }
        this._router.navigate(['/plantillas']);
    }
    validate = () => {
        const someSection = this.refsArray.length > 0;
        this.canPost = !!this.titulo && !!this.descripcion && someSection;
    };
}
