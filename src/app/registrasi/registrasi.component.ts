import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-registrasi',
  templateUrl: './registrasi.component.html',
  styleUrls: ['./registrasi.component.css']
})
export class RegistrasiComponent implements OnInit {
  
  
  register = {"name":"","email":"","mobile":"","password":"","re_password":""}
  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }
  registerUser(){
    if(this.register.name ==""){
      alert("Name should not be empty");
      return
    }
    if(this.register.email ==""){
     alert("Email should not be empty");
     return
    }
    if(this.register.password ==""){
      alert("password should not be empty");
      return
     }
     if(this.register.password != this.register.re_password){
      alert("password and rePassword should be same");
      return
     }
     if(this.register.mobile ==""){
       alert("Mobile should not be empty");
      return
     }
     

    let request ={     
       "name":this.register.name,
      "email":this.register.email,
      "password":this.register.password,
      "mobile":this.register.mobile
    }
    this.http.postRequest('api/signup/user',request).subscribe(data=>{
         alert("Register successfully..")
         window.location.reload();
    },error=>{
      alert("Error in login "+error);
    })
  }
}
