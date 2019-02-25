import { Component, OnInit, Input } from '@angular/core';


declare var $: any;
@Component({
  selector: 'app-plantilla-viewer',
  templateUrl: './plantilla-viewer.component.html',
  styleUrls: ['./plantilla-viewer.component.css']
})
export class PlantillaViewerComponent implements OnInit {

  @Input() plantilla;    
  respuesta = null;

  constructor() { }

  ngOnInit() {
    
  }

}
