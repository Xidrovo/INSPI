import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plantilla-viewer',
  templateUrl: './plantilla-viewer.component.html',
  styleUrls: ['./plantilla-viewer.component.css']
})
export class PlantillaViewerComponent implements OnInit {

  @Input() plantilla;

  options = {
    addSubmit: false,    
  }

  constructor() { }

  ngOnInit() {
  }

}
