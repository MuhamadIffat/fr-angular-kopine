import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { map, filter, scan,catchError,tap } from 'rxjs/operators';
import { User } from '../model/user';
import { Order } from '../model/order';
import { Json } from '../shared/json';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

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

    public getUsers(): Observable<User[]> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.get<User[]>(`${this.apiServerUrl}api/all`,httpOptionsWithToken);
    }

    public getAllOrder(): Observable<Order[]> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.get<Order[]>(`${this.apiServerUrl}api/order/getAll`,httpOptionsWithToken);
    }

    public getUsersId(employeeId: number): Observable<any> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.delete<void>(`${this.apiServerUrl}api/find/${employeeId}`, httpOptionsWithToken);
    }
  
    public addUser(employee: User): Observable<User> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.post<User>(`${this.apiServerUrl}api/add`, employee,httpOptionsWithToken);
    }
  
    public updateUser(employee: User): Observable<User> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.put<User>(`${this.apiServerUrl}api/update`, employee, httpOptionsWithToken);
    }
  
    public deleteUser(employeeId: number): Observable<void> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.delete<void>(`${this.apiServerUrl}api/delete/${employeeId}`, httpOptionsWithToken);
    }

    getDataExcel(){
      const httpOptionsWithToken = {
        responseType: 'arraybuffer' as 'json',
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken(),
          
        })
      };
      return this.http.get<any>(`${this.apiServerUrl}api/order/export/excel`,httpOptionsWithToken);
    }
}
