import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  booksRoot: string = "http://henri-potier.xebia.fr/books";
  usersApi:string="";
  offersApi:string="";
  apiRoot:string;
  dataApi:string="";
  constructor( private httpClient: HttpClient) { }

  // Get Books
  getBooks() {
    return this.httpClient.get(this.booksRoot);
  }

   //Get commercial offers
   getoffers(offersApi){
    this.usersApi = offersApi;
    return this.httpClient.get(this.usersApi);
  }

  getUsers(userRoot){
    this.usersApi = userRoot;
    return this.httpClient.get(this.usersApi);
  }

  getData(apiRoot){
    this.usersApi = apiRoot;
    return this.httpClient.get(this.usersApi);
  }
} 


