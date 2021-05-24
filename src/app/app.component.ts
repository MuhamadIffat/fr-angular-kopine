import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isLogin = false;
  welcomeUsername = "";

  constructor(private http:HttpService) {
    if(this.http.isLogin()){
      this.isLogin = true;
      this.welcomeUsername = this.http.getLoginDataByKey("name");
    }
   }

  ngOnInit(){  } 
  
  logout(){
    this.http.logout();
    this.isLogin = false;
    window.location.reload();
  }
}
