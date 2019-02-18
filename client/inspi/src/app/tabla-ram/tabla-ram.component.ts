import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-ram',
  templateUrl: './tabla-ram.component.html',
  styleUrls: ['./tabla-ram.component.css']
})
export class TablaRamComponent implements OnInit {

  @Input() detalle;

  constructor() { }

  ngOnInit() {
  }

}
