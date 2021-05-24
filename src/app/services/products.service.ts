import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Products } from '../model/products';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = "http://localhost:8080/";
  apiServerUrl = "http://localhost:8080/";
  public dataForm:  FormGroup; 

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

    public getProducts(): Observable<Products[]> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.get<Products[]>(`${this.apiServerUrl}api/getAllProducts`,httpOptionsWithToken);
    }

    public getProductsId(productId: number): Observable<any> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.delete<void>(`${this.apiServerUrl}api/find/${productId}`, httpOptionsWithToken);
    }
  
    public addUser(formData: FormData): Observable<any> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.post<any>(`${this.apiServerUrl}api/upload`, formData,httpOptionsWithToken);
    }
  
    public updateProducts(products: Products): Observable<Products> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.put<Products>(`${this.apiServerUrl}api/products/update`, products, httpOptionsWithToken);
    }

    public updatedata(id: number, value: any): Observable<Object> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.put<Products>(`${this.apiServerUrl}api/products/${id}`, value,httpOptionsWithToken);
    }
  
    public deleteProducts(productId: number): Observable<void> {
      const httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer '+this.getLoginToken()
        })
      };
      return this.http.delete<void>(`${this.apiServerUrl}api/products/delete/${productId}`, httpOptionsWithToken);
    }

    public uploadFile(file: File){
      const formData: FormData = new FormData();
      formData.append('file',file);
      const req = new HttpRequest('POST','<server the url upload>',formData,{
          reportProgress:true,
          responseType:'text'
      });
      return this.http.request(req);
    }
}
