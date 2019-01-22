import { Component,OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http'; 
import { Http } from '@angular/http';
import { MyserviceService } from './myservice.service';
// import {Response} from '@angular/http'
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyApp';
  todaydate;
  httpdata;
  searchParam = 2;
  name;
  constructor(private myservice: MyserviceService, private http: Http) { 
  }
  ngOnInit() {
    this.todaydate = this.myservice.showTodayDate();
    this.http.get("/assets/data/users.json?id="+this.searchParam).
    map((response) => response.json()).
    subscribe((data) => {this.displaydata(data);})
 }
 displaydata(data) {this.httpdata = data;}

 converttoarray(data) {
  console.log(data);
  this.name = data[0].name;
}
}
