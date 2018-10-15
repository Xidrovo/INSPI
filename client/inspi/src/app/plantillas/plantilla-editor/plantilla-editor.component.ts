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

@Component({
  selector: 'app-plantilla-editor',
  templateUrl: './plantilla-editor.component.html',
  styleUrls: ['./plantilla-editor.component.css'],
  entryComponents: [AgregarSeccionComponent]
})
export class PlantillaEditorComponent {
  private title: string;
  private plantilla: any = {};
  refsArray: any[] = [];
  @ViewChild('seccionContainer', { read: ViewContainerRef })
  container;
  constructor(
    private resolver: ComponentFactoryResolver,
    private apiService: ApiService
  ) {}
  // Agrega una nueva sección, llamando al componente AgregarSeccionComponent
  addSeccion() {
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
    this.title = '';
  }

  // Esta función elimina la última referencia de sección agregada.
  deleteLastSeccion() {
    const componentRef = this.refsArray.pop();
    componentRef.destroy();
  }
  // Elimina el componente del DOM y del array de Ref dado un índice.
  eliminarAlgo(index) {
    const componentRef = this.refsArray[index];
    componentRef.destroy();
    this.refsArray.splice(index, 1);
    this.reCalculateIndex();
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
  guardarPlantilla() {
    this.apiService
      .addPlantilla({
        titulo: 'hola y chao',
        descripcion:
          'Plantilla para el programa de evaluación externa de la calidad',
        secciones: [
          {
            titulo: 'Seccion A',
            descripcion: 'En esta pregunta debe ingresar un párrafo',
            requerido: true,
            detalle: '',
            tipo_dato: 5
          }
        ]
      })
      .subscribe((data: Array<object>) => {
        console.log(data);
      });
  }
}
