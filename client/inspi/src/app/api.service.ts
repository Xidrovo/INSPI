import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { throwError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  getCampanias() {
    return this.httpClient.get(`${this.API_URL}/api/programas/`);
  }
  // This function must call the get /api/plantillas/:plantilla_id
  getCampania(idCampania) {
    return this.httpClient
      .get(`${this.API_URL}/api/programas/` + idCampania)
      .toPromise()
      .then(res => console.log(res.toString()))
      .catch(err => console.log(err));
  }

  addCampania(payload): any {
    return this.httpClient
      .post(`${this.API_URL}/api/programas/`, payload)
      .toPromise()
      .then(res => console.log(res.toString()))
      .catch(err => console.log(err));
  }

  setCampania(payload): any {
    console.log("aqui");
    return this.httpClient
      .put(`${this.API_URL}/api/programas/` + payload.id, payload)
      .toPromise()
      .then(res => console.log(res.toString()))
      .catch(err => console.log(err));
  }

  deleteCampania(idCampania): any {
    return this.httpClient
      .delete(`${this.API_URL}/api/programas/` + idCampania)
      .toPromise()
      .then(res => console.log(res.toString()))
      .catch(err => console.log(err));
  }

  getPlantillas() {
    return this.httpClient.get(`${this.API_URL}/api/plantillas/`);
  }
  // This function must call the get /api/plantillas/:plantilla_id
  getPlantilla(idPlantilla) {
    return this.httpClient
      .get(`${this.API_URL}/api/plantillas/` + idPlantilla)
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(err => console.log(err));
  }
  // This function must call the get /api/tipos_de_dato/
  getTipoDeDatos() {
    return this.httpClient.get(`${this.API_URL}/api/tipos_de_dato/`);
  }
  // This function must call the post /api/plantillas/
  addPlantilla(payload): any {
    return this.httpClient
      .post(`${this.API_URL}/api/plantillas/`, payload)
      .toPromise()
      .then(res => console.log(res.toString()))
      .catch(err => console.log(err));
  }
  // This function must call the post /api/plantillas/:idPlantilla
  setPlantilla(payload): any {
    return this.httpClient
      .put(`${this.API_URL}/api/plantillas/` + payload.id, payload)
      .toPromise()
      .then(res => console.log(res.toString()))
      .catch(err => console.log(err));
  }
  // This function must call the delete /api/plantillas/:plantilla_id
  deletePlantilla(idPlantilla): any {
    return this.httpClient
      .delete(`${this.API_URL}/api/plantillas/` + idPlantilla)
      .toPromise()
      .then(res => console.log(res.toString()))
      .catch(err => console.log(err));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
