import { Component, OnInit, NgModule, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;
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
  private arrayPreguntas: any[] = []
  private titulo: ''
  private tipo: ''

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

  addInfo(titulo, pregunta) {
    let info = {
      titulo: this.titulo,
      tipo: this.tipo
    }
    this.arrayPreguntas.push( info )
    $('#preguntasModal' + this.index).modal('hide');
    this.titulo = ''
    this.tipo = ''
  }

  onSelectChange() {
    $('#preguntasModal' + this.index).modal('show');
  }

  borrarPregunta(index) {
    this.arrayPreguntas.splice(index, 1)
  }
}
