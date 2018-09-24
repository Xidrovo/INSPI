import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, NgModule, Input }  from '@angular/core';
import { AgregarSeccionComponent } from '../../agregar-seccion/agregar-seccion.component'

@Component({
  selector: 'app-plantilla-editor',
  templateUrl: './plantilla-editor.component.html',
  styleUrls: ['./plantilla-editor.component.css'],
  entryComponents: [ AgregarSeccionComponent ]
})

export class PlantillaEditorComponent {

  private title: string;

  @ViewChild('seccionContainer', { read: ViewContainerRef }) container;
  constructor(private resolver: ComponentFactoryResolver) {}
  //Agrega una nueva sección, llamando al componente AgregarSeccionComponent
  AddSeccion() {
    //Creo una clase de tipo AgregarSeccionComponent
    console.log(this.title)
    const factory = this.resolver.resolveComponentFactory(AgregarSeccionComponent)
    //    
    let componentRef = this.container.createComponent(factory)
    componentRef._component.setTitle(this.title)
  }
}
