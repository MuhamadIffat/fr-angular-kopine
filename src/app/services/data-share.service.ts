import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  shareDataSubject =new Subject<any>();
  constructor() { }

  sendData(data){
    this.shareDataSubject.next(data);
  }
}
