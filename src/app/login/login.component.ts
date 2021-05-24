import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService} from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mobile = "123456789";
  password = "test";
  isLogin = false;
  welcomeUsername = "";

  constructor(private router: Router,private http: HttpService) {
    let request = {}
    this.http.postRequest("api/status",request).subscribe(data=>{
      console.log("test",data);
  },error=>{
    alert("Server connection error "+error)
  })
  
  }

  ngOnInit(): void {
  
  }

  
  loginUserCheck(){
    if(this.mobile == ""){
      alert("Name should not be empty");
      return;
    }
    if(this.password == ""){
     alert("Password should not be empty");
     return;
    }    
    let request ={
      "mobile": this.mobile,
      "password":this.password
    }
    this.http.postRequest('api/login/user',request).subscribe(data=>{
        if(data.hasOwnProperty("token")){
          this.http.setLoginToken(data['token']);
          this.http.setLoginData(data);
          this.welcomeUsername = this.http.getLoginDataByKey("name");
          this.isLogin = true;
          window.location.reload();
        }
    },error=>{
      alert("Eror in login "+error);
    })
  } 

}
