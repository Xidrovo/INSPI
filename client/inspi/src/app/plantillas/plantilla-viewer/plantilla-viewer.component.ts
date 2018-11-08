import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-plantilla-viewer',
  templateUrl: './plantilla-viewer.component.html',
  styleUrls: ['./plantilla-viewer.component.css']
})
export class PlantillaViewerComponent implements OnInit {

  @Input() plantilla;
  tablaRAM = "<app-tabla-ram></app-tabla-ram>"

  options = {
    addSubmit: false,    
  }

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    //var d1 = this.elementRef.nativeElement.querySelector('.tablaRAM');
    //d1.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
    //$('.tablaRam')[0].innerHTML = '<h4>Hola mundo...</h4>'    
  }
}
