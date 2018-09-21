import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
	API_URL  =  'http://localhost:8000';
	constructor(private  httpClient:  HttpClient) {}
	getNotes(){
		return  this.httpClient.get(`${this.API_URL}/api/note/1`);
	}  
}
