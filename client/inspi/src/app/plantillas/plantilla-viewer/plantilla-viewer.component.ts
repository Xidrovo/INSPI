import { Component, OnInit, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import * as $ from 'jquery';
import { TablaRamComponent } from '../../tabla-ram/tabla-ram.component';

declare var $: any;
@Component({
  selector: 'app-plantilla-viewer',
  templateUrl: './plantilla-viewer.component.html',
  styleUrls: ['./plantilla-viewer.component.css'],
  entryComponents: [TablaRamComponent]
})
export class PlantillaViewerComponent implements OnInit {

  @Input() plantilla;
  tablaRAM = "<app-tabla-ram></app-tabla-ram>"
  @ViewChild('RAMTable', { read: ViewContainerRef })
  container;

  options = {
    addSubmit: false,    
  }

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if ($('.tablaRam').length > 0){
      console.log("Plantillas Viewer...:",$('.tablaRam'))
      //if ($('.tablaRam')[0].innerHTML != '<ng-container #RAMTable></ng-container>')
        //$('.tablaRam')[0].innerHTML = '<ng-container #RAMTable></ng-container>'//this.tablaRAM//'<h4>Hola mundo...</h4>'    
      const factory = this.resolver.resolveComponentFactory(
        TablaRamComponent
      );
      const componentRef = this.container.createComponent(factory);
    }

    
  }

  ngBeforeViewInit(){
    console.log("Before")
  }

  ngAfterViewInit() {
    //var d1 = this.elementRef.nativeElement.querySelector('.tablaRAM');
    //d1.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
    
    
  }
}
