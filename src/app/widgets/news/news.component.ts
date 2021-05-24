import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Slide } from 'src/app/shared/slide';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  widgetStatus:boolean;
  dataUrl:string;
  newsData:object;
  firstRowData;
  secRowData;
  firstRowStatus:boolean;
  secRowStatus:boolean;
  flag:number;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.widgetStatus = false;
    this.dataUrl = "http://localhost:4200/assets/data/newsData.json";
    this.firstRowStatus = true;
    this.secRowStatus = false;
    this.flag = 3;
    this.getPostsData(this.widgetStatus);
  }

  getPostsData(widgetStatus){
    this.widgetStatus = widgetStatus;
    this.apiService.getData('../assets/data/newsData.json').subscribe(
      data => { 
        this.newsData = data;
        this.firstRowData = new Slide().setFirstRow(this.newsData,this.firstRowData,this.flag);
        this.secRowData = new Slide().setSecondRow(this.newsData,this.secRowData,this.flag);
        this.resolveAfterdelay(this.widgetStatus,this.newsData);
      },
      err => console.error(err),
      () => console.log('done loading posts')
    );
  }

  resolveAfterdelay(widgetStatus:boolean,newsData:object):any {
    this.widgetStatus = widgetStatus;
    this.newsData = newsData;
    return new Promise(resolve => {
      setTimeout(() => {
        this.widgetStatus = true;
        resolve('resolved');
      }, 
      500);
    });
  }

  setRowStatus(firstRowStatus:boolean,secRowStatus:boolean){
    this.firstRowStatus = firstRowStatus;
    this.secRowStatus = secRowStatus;
    if(this.firstRowStatus == true){
      this.firstRowStatus = false;
      this.secRowStatus = true;
    }else{
      this.firstRowStatus = true;
      this.secRowStatus = false;
    }
  }

}
