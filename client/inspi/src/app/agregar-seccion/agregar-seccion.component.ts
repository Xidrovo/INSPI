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
  private editIndex = 0;
  private onEdit: Boolean = false;
  private dato = '';

  private filled: Boolean = false;

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
  setPreguntas(preguntas) {
    this.arrayPreguntas = preguntas;
  }
  eliminar(event, index) {
    this.deleteClick.emit(index);
  }

  addInfo(titulo, pregunta) {
    console.log('agregando info');
    const info = {
      titulo: this.titulo,
      tipo_dato: this.tipo_dato,
      requerido: this.requerido,
      detalle: this.splitDetalle(this.detalle),
      descripcion: this.descripcion,
      dato: this.dato
    };
    if (this.onEdit) {
      this.arrayPreguntas[this.editIndex] = info;
      this.onEdit = false;
    } else {
      this.arrayPreguntas.push(info);
    }
    $('#preguntasModal' + this.index).modal('hide');
    this.cleanModal();
  }
  splitDetalle(detalle) {
    if (this.tipo_dato != 1 && this.tipo_dato != 2) {
      return detalle;
    }
    let detail = Array();
    if (detalle !== null && detalle !== undefined) {
      detalle = detalle.split('\n');
      detalle.forEach((element, i) => {
        detail.push({ value: i, name: element });
      });
      return detail;
    }
    return '';
  }
  getInfo() {
    return { titulo: this.title, preguntas: this.arrayPreguntas };
  }
  isArrayEmpty() {
    return this.arrayPreguntas.length === 0;
  }
  onSelectChange() {
    $('#preguntasModal' + this.index).modal('show');
    this.dato = $('#sel' + this.index + ' option:selected').text();
  }

  borrarPregunta(index) {
    this.arrayPreguntas.splice(index, 1);
  }

  editarPregunta(index) {
    this.editIndex = index;
    this.onEdit = true;
    var info = this.arrayPreguntas[index];
    this.titulo = info['titulo'];
    this.tipo_dato = info['tipo_dato'];
    this.requerido = info['requerido'];
    this.detalle = info['detalle'];
    this.descripcion = info['descripcion'];
    $('#preguntasModal' + this.index).modal('show');
  }

  cancelAction() {
    this.onEdit = false;
    this.cleanModal();
  }

  cleanModal() {
    this.titulo = '';
    this.tipo_dato = '-1';
    this.requerido = false;
    this.detalle = '';
    this.descripcion = '';
  }

  validate() {
    if (this.tipo_dato == 2) {
      this.filled = !!this.titulo && !!this.descripcion && !!this.detalle;
    } else if (this.tipo_dato == 1) {
      this.filled = !!this.titulo && !!this.descripcion && !!this.detalle;
    } else {
      this.filled = !!this.titulo && !!this.descripcion;
    }
  }
}
