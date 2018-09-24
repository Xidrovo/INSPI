import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-editor',
  templateUrl: './plantilla-editor.component.html',
  styleUrls: ['./plantilla-editor.component.css']
})
export class PlantillaEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  guardarPlantilla(){
    console.log("Guardando plantilla...");
  }
  
}
