import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';

import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-viales',
  templateUrl: './viales.component.html',
  styleUrls: ['./viales.component.css']
})
export class VialesComponent implements OnInit {
  vialesArray: Object [];
  codigo: String = "";
  idPrograma;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private apiService: ApiService,    
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      columnDefs: [
          { orderable: true, targets: 0, className: 'col-md-9' },
          { orderable: false, targets: 1 }          
      ]
    };
    
    this.route.paramMap.subscribe(params => {
      this.idPrograma = params.get('id');
      this.obtenerViales(this.idPrograma);
    });
    
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  obtenerViales(idPrograma) {
    console.log(idPrograma);
    this.apiService.getViales(idPrograma).subscribe((data: object) => {
        this.vialesArray =
            data['error'] == 0
                ? data['viales']
                : [
                      {
                          id: -1,
                          codigo: ''
                      }
                  ];
        this.dtTrigger.next();
    });
  }

  /*
  async eliminarVial(vial: Object) {
    await this.apiService.deleteVial(vial['id']);
    const index = this.vialesArray.findIndex(x => {
        return x['id'] === vial['id'];
    });
    this.vialesArray.splice(index, 1);
  }
  
  async editarVial(id) {      
    var vial = {
      id: id,
      codigo: this.codigo,
      respuestas: {}
    }
    await this.apiService.setVial(vial);
  }
  */

  async crearVial(){
    var vial = {
      idPrograma: this.idPrograma,
      codigo: this.codigo,
      respuestas: {}
    }
    await this.apiService.addVial(vial);
    this.vialesArray.push(vial);
  }
}
