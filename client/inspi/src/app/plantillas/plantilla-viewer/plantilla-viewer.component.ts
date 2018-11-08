import { Component, OnInit, Input, ElementRef } from '@angular/core';
import *  as $ from 'jquery';

declare var $: any;

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

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
    $('.tablaRam').val("Hola ram");
  }

  ngAfterViewInit() {
    var d1 = this.elementRef.nativeElement.querySelector('.tablaRAM');
    //d1.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
  }
}
