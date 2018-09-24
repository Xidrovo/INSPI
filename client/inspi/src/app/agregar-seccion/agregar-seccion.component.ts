import { Component, OnInit, NgModule, ComponentFactoryResolver } from '@angular/core';

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

  setTitle(title) {
    this.title = title
  }
}
