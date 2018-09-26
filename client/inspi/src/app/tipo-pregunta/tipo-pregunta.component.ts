import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tipo-pregunta',
  templateUrl: './tipo-pregunta.component.html',
  styleUrls: ['./tipo-pregunta.component.css']
})
export class TipoPreguntaComponent implements OnInit {

  @Output() sendInfo = new EventEmitter();

  private tituloPregunta: string
  private tipoPregunta: string

  ngOnInit() {
  }
  //Envía en un json el tipo de pregunta y el título
  sendPregunta() {
    this.sendInfo.emit( {titulo: this.tituloPregunta, tipo: this.tipoPregunta} ) //Envío un objeto con título y tipo.
  }
  setTipo(value) {
    this.tipoPregunta = value
  }
}
