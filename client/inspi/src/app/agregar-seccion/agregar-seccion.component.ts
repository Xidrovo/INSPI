import { Component, OnInit, NgModule, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';

@NgModule ({
   exports: [ AgregarSeccionComponent ],
   entryComponents: [
      AgregarSeccionComponent,
    ]
})

@Component({
  selector: 'app-agregar-seccion',
  templateUrl: './agregar-seccion.component.html',
  styleUrls: ['./agregar-seccion.component.css']
})

export class AgregarSeccionComponent {
  private title: String = '<Título aquí>'
  private index: Number = 0

  @Output() deleteClick: EventEmitter<String> = new EventEmitter<String>();

  setTitle(title) {
    this.title = title
  }

  setIndex(index) {
    this.index = index
  }

  eliminar(event, index) {
    this.deleteClick.emit(index)
  }
}
