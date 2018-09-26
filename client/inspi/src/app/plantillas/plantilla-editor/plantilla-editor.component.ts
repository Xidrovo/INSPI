import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, NgModule, Input }  from '@angular/core';
import { AgregarSeccionComponent } from '../../agregar-seccion/agregar-seccion.component'

@Component({
  selector: 'app-plantilla-editor',
  templateUrl: './plantilla-editor.component.html',
  styleUrls: ['./plantilla-editor.component.css'],
  entryComponents: [ AgregarSeccionComponent ]
})

export class PlantillaEditorComponent {

  private title: string
  refsArray: any[] = []

  @ViewChild('seccionContainer', { read: ViewContainerRef }) container;
  constructor(private resolver: ComponentFactoryResolver) {}
  //Agrega una nueva sección, llamando al componente AgregarSeccionComponent
  addSeccion() {
    //Creo una clase de tipo AgregarSeccionComponent
    const factory = this.resolver.resolveComponentFactory(AgregarSeccionComponent)
    let componentRef = this.container.createComponent(factory)
    
    componentRef._component.setIndex(this.refsArray.length)
    componentRef._component.setTitle(this.title)
    //De esta forma agregamos qué hacer cuando el evento 'deleteClick' sea disparado
    componentRef.instance.deleteClick.subscribe(() => {
      this.eliminarAlgo(componentRef._component.index)
    })
    this.refsArray.push(componentRef)
  }

  //Esta función elimina la última referencia de sección agregada.
  deleteLastSeccion() {
    let componentRef = this.refsArray.pop()
    componentRef.destroy()
  }
  //Elimina el componente del DOM y del array de Ref dado un índice.
  eliminarAlgo(index){
    let componentRef = this.refsArray[index]
    componentRef.destroy()
    this.refsArray.splice(index, 1)
    this.reCalculateIndex()
  }
  //resetea el índice de cada elemento
  reCalculateIndex() {
    let cont = 0;
    this.refsArray.forEach(function (value) {
      value._component.setIndex(cont)
      cont++
    })
  }
}
