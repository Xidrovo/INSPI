import { Component,  OnInit } from '@angular/core';
import { ApiService } from  './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'inspi';
  private notes: Array<object> = [];
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.getNotes();
  }
  public  getNotes(){
    this.apiService.getNotes().subscribe((data:  Array<object>) => {
        this.notes  =  data;
        console.log(data);
    });
  }
}
