import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla-ram.component.html',
  styleUrls: ['./tabla-ram.component.css']
})
export class TablaRamComponent implements OnInit {

  @Input() detalle;
  @Input() respuesta;

  constructor() { }

  ngOnInit() {
    if (Object.keys(this.respuesta).length==0){      
      this.parseRespuestasTabla();
    }
  }

  parseRespuestasTabla(){
    
    this.detalle.FILAS.campos.forEach(antibiotico => {
        let respAntib = {};
        this.detalle.COLUMNAS.forEach(column => {  
            let respCabecera = {};              
            column.campos.forEach(campo => {
                respCabecera[campo.titulo] = "";
            });
            respAntib[column.cabecera] = respCabecera;
        });
        this.respuesta[antibiotico] = respAntib;
    });
        
  }

}
