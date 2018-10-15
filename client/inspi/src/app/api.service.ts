import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { resolve } from 'url';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'http://localhost:8000';
  constructor(private httpClient: HttpClient) {}
  getNotes() {
    return this.httpClient.get(`${this.API_URL}/api/note/1`);
  }
  // This function must call the post /api/plantillas/
  public addPlantilla(payload): any {
    console.log(payload);
    return this.httpClient
      .post(`${this.API_URL}/api/plantillas/`, payload)
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
