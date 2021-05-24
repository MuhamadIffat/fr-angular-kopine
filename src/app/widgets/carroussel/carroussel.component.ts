import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-carroussel',
  templateUrl: './carroussel.component.html',
  styleUrls: ['./carroussel.component.scss']
})
export class CarrousselComponent implements OnInit {

  carousselData;
  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData():void{
    this.apiService.getBooks().subscribe(
      data => { 
        this.carousselData = data; 
      },
      err => console.error(err),
      () => console.log('done loading books into caroussel')
    );
  }

}
