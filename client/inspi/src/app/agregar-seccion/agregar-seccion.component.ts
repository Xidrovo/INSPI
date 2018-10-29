import {
  Component,
  OnInit,
  NgModule,
  ComponentFactoryResolver,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ApiService } from '../api.service';

declare var $: any;
@NgModule({
  exports: [AgregarSeccionComponent],
  entryComponents: [AgregarSeccionComponent]
})
@Component({
  selector: 'app-agregar-seccion',
  templateUrl: './agregar-seccion.component.html',
  styleUrls: ['./agregar-seccion.component.css']
})
export class AgregarSeccionComponent implements OnInit {
  private title: String = '<Título aquí>';
  private index: Number = 0;
  private arrayPreguntas: any[] = [];

  private titulo = '';
  private descripcion = '';
  private tipo_dato: any;
  private requerido = false;
  private detalle = '';
  private tipoDatos: any;
  @Output()
  deleteClick: EventEmitter<String> = new EventEmitter<String>();

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.tipoDatos = this.apiService
      .getTipoDeDatos()
      .subscribe((data: Array<object>) => {
        this.tipoDatos = data;
      });
  }
  setTitle(title) {
    this.title = title;
  }

  setIndex(index) {
    this.index = index;
  }

  eliminar(event, index) {
    this.deleteClick.emit(index);
  }

  addInfo(titulo, pregunta) {
    const info = {
      titulo: this.titulo,
      tipo_dato: this.tipo_dato,
      requerido: this.requerido,
      detalle: this.splitDetalle(this.detalle),
      descripcion: this.descripcion
    };
    this.arrayPreguntas.push(info);
    $('#preguntasModal' + this.index).modal('hide');
    this.titulo = '';
    this.tipo_dato = '-1';
    this.requerido = false;
    this.detalle = '';
    this.descripcion = '';
  }
  splitDetalle(detalle) {
    var detail = Array();
    if (detalle !== null && detalle !== undefined) {
      detalle = detalle.split('\n');
      detalle.forEach((element, i) => {
        detail.push({value: i, name:element});
      });
      console.log("Detalle generado: ");
      console.log(detail);
      console.log(detail.toString());
      return detail;
    }
    return '';
  }
  getInfo() {
    return { titulo: this.title, preguntas: this.arrayPreguntas };
  }
  onSelectChange() {
    $('#preguntasModal' + this.index).modal('show');
  }

  borrarPregunta(index) {
    this.arrayPreguntas.splice(index, 1);
  }
}
