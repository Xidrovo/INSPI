import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { throwError, of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    API_URL;
    constructor(private httpClient: HttpClient) {
        if (environment.production) {
            this.API_URL = environment.baseUrl;
        } else {
            this.API_URL = 'http://localhost:8000/api/';
        }
    }

    getCampanias() {
        return this.httpClient.get(`${this.API_URL}programas/`);
    }
    // This function must call the get plantillas/:plantilla_id
    getCampania(idCampania) {
        return this.httpClient
            .get(`${this.API_URL}programas/` + idCampania)
            .toPromise()
            .then(res => {
                let response: any;
                response = res;
                return response.programa;
            })
            .catch(err => console.log(err));
    }

    addCampania(payload): any {
        return this.httpClient
            .post(`${this.API_URL}programas/`, payload)
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(err => console.log(err));
    }

    setCampania(payload): any {
        return this.httpClient
            .put(`${this.API_URL}programas/` + payload.id, payload)
            .toPromise()
            .then(res => console.log(res.toString()))
            .catch(err => console.log(err));
    }

    deleteCampania(idCampania): any {
        return this.httpClient
            .delete(`${this.API_URL}programas/` + idCampania)
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(err => console.log(err));
    }

    getPlantillas() {
        return this.httpClient.get(`${this.API_URL}plantillas/`);
    }
    // This function must call the get plantillas/:plantilla_id
    getPlantilla(idPlantilla) {
        return this.httpClient
            .get(`${this.API_URL}plantillas/` + idPlantilla)
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(err => console.log(err));
    }
    // This function must call the get tipos_de_dato/
    getTipoDeDatos() {
        return this.httpClient.get(`${this.API_URL}tipos_de_dato/`);
    }
    // This function must call the post plantillas/
    addPlantilla(payload): any {
        return this.httpClient
            .post(`${this.API_URL}plantillas/`, payload)
            .toPromise()
            .then(res => console.log(res.toString()))
            .catch(err => console.log(err));
    }
    // This function must call the post plantillas/:idPlantilla
    setPlantilla(payload): any {
        return this.httpClient
            .put(`${this.API_URL}plantillas/` + payload.id, payload)
            .toPromise()
            .then(res => console.log(res.toString()))
            .catch(err => console.log(err));
    }
    // This function must call the delete plantillas/:plantilla_id
    deletePlantilla(idPlantilla): any {
        return this.httpClient
            .delete(`${this.API_URL}plantillas/` + idPlantilla)
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(err => console.log(err));
    }

    getViales(idPrograma) {
        return this.httpClient.get(`${this.API_URL}viales/` + idPrograma);
    }

    getVial(idVial) {
        return this.httpClient
            .get(`${this.API_URL}vial/respuesta/${idVial}`)
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(err => console.log(err));
    }

    addVial(payload, idPrograma): any {
        return this.httpClient
            .post(`${this.API_URL}viales/` + idPrograma, payload)
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(err => console.log(err));
    }

    //  Content-Type': 'application/json'
    deleteVial(programaId, codigoVial): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: {
                codigo: codigoVial
            }
        };
        return this.httpClient
            .delete(`${this.API_URL}viales/${programaId}`, httpOptions)
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(err => console.log(err));
    }
    setVial(payload): any {
        return this.httpClient
            .put(`${this.API_URL}viales/`, payload)
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
                `Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
