import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api.service';
@Component({
  selector: 'app-plantillas-home',
  templateUrl: './plantillas-home.component.html',
  styleUrls: ['./plantillas-home.component.css']
})
export class PlantillasHomeComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  mySchema = {
    type: 'object',
    title: 'Comment',
    properties: {
      name: {
        title: 'Name',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string',
        pattern: '^\\S+@\\S+$',
        description: 'Email will be used for evil.',
        validationMessage: 'Email incorrecto'
      },
      comment: {
        title: 'Comment',
        type: 'string',
        maxLength: 20,
        validationMessage: "Don't be greedy!"
      }
    },
    required: ['name', 'email', 'comment']
  };

  myForm = [
    {
      type: 'section',
      htmlClass: 'row',
      items: [
        {
          type: 'section',
          htmlClass: 'col-xs-6',
          items: ['name']
        },
        {
          type: 'section',
          htmlClass: 'col-xs-6',
          items: ['email']
        }
      ]
    },
    {
      key: 'comment',
      type: 'textarea',
      placeholder: 'Make a comment'
    }
  ];

  plantillas = [
    {
      title: 'Plantilla RAM 2019',
      description:
        'Plantilla para programa de evaluación externa de la calidad de RAM',
      schema: this.mySchema,
      form: this.myForm,
      id: 'p1'
    },
    {
      title: 'Plantilla EJ',
      description:
        'Plantilla para programa de evaluación externa de la calidad de RAM',
      schema: this.mySchema,
      form: this.myForm,
      id: 'p2'
    }
  ];
  plantillasArray: any;
  ngOnInit() {
    this.obtenerPlantillas();
    console.log(this.plantillasArray);
  }

  crearPlantilla() {
    console.log('Crear plantilla');
  }

  obtenerPlantillas() {
    this.plantillasArray = this.apiService
      .getPlantillas()
      .subscribe((data: Array<object>) => {
        this.plantillasArray = data;
      });
  }

  // Making it async, so we can show if there's a new error or not.
  async eliminarPlantilla(plantilla) {
    await this.apiService.deletePlantilla(plantilla.pk);
    const index = this.plantillasArray.plantillas.findIndex(x => {
      return x.pk === plantilla.pk;
    });
    this.plantillasArray.plantillas.splice(index, 1);
  }
}
