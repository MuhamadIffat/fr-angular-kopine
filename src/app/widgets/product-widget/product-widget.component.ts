import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: ['./product-widget.component.scss']
})
export class ProductWidgetComponent implements OnInit {

  booksWidget;
  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProductsData();
  }
  getProductsData():void{
    this.apiService.getBooks().subscribe(
      data => { 
        this.booksWidget = data;
        this.booksWidget = this.booksWidget.slice(5);
      },
      err => console.error(err),
      () => console.log('done loading books into widget')
    );
  }


}
