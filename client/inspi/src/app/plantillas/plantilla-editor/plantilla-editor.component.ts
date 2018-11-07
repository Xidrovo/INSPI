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
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantilla-editor',
  templateUrl: './plantilla-editor.component.html',
  styleUrls: ['./plantilla-editor.component.css'],
  entryComponents: [AgregarSeccionComponent]
})
export class PlantillaEditorComponent {
  private title: string;
  private plantilla: any;
  private payload: any = [];
  private titulo: string;
  private descripcion: string;
  private canPost = false;
  refsArray: any[] = [];
  @ViewChild('seccionContainer', { read: ViewContainerRef })
  container;
  constructor(
    private resolver: ComponentFactoryResolver,
    private apiService: ApiService,
    private _router: Router
  ) {}
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
      titulo: this.titulo,
      descripcion: this.descripcion,
      secciones: this.payload
    };
    await this.apiService.addPlantilla(this.plantilla);
    this._router.navigate(['/plantillas']);
  }
  validate = () => {
    const someSection = this.refsArray.length > 0;
    let somethingsEmpty = false;
    this.refsArray.forEach(x => {
      if (x._component.isArrayEmpty()) {
        somethingsEmpty = true;
      }
    });
    this.canPost =
      !!this.titulo && !!this.descripcion && someSection && !somethingsEmpty;
  };
}
