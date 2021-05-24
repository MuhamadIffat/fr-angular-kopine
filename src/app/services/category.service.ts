import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../model/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = "http://localhost:8080/";
  apiServerUrl = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  postRequest(url:string,param:{}){
    return this.http.post(this.url+url,param,httpOptions)
    .pipe(
      catchError(this.handleError.bind(this)) // then handle the error
    );
  }
  postRequestWithToken(url:string,param:{}){
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+this.getLoginToken()
      })
    }; 
    param['userId'] = "1";
    return this.http.post(this.url+url,param,httpOptionsWithToken)
    .pipe(
      catchError(this.handleError.bind(this)) // then handle the error
    );
  }
  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
          return throwError("Something went wrong..while connecting with server");
      }
    }
    setLoginData(data){
      localStorage.setItem("login_data",JSON.stringify(data.user_profile_details));
    }
    getLoginDataByKey(key){
      let data = JSON.parse(localStorage.getItem("login_data"));
      if(data.hasOwnProperty(key)){
        return data[key];
      }
      return null;
    }

    setLoginToken(token){
      if(token != "")
        localStorage.setItem("token",token)
    }
    getLoginToken(){
        return localStorage.getItem("token")
    }
    logout(){
      localStorage.setItem("token","");
    }
    isLogin(){
      try{
        console.log("login token ",this.getLoginToken());
        
        if(this.getLoginToken() != "" && this.getLoginToken().length >10){
          return true;
        }
      }catch(e){

      }
     return false;
    }

    public getCategorys(): Observable<Category[]> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.get<Category[]>(`${this.apiServerUrl}api/cates`,httpOptionsWithToken);
    }
}
