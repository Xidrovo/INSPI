import { Component, OnInit, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
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
  @ViewChild('RAMTable', { read: ViewContainerRef })
  container;

  options = {
    addSubmit: false,    
  }

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    
  }

  ngBeforeViewInit(){
    console.log("Before")
  }

  ngAfterViewInit() {
    //var d1 = this.elementRef.nativeElement.querySelector('.tablaRAM');
    //d1.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
    
    
  }
}
