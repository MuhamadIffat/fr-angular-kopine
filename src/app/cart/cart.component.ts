import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DataShareService } from '../services/data-share.service';
import { CartCommon } from '../shared/cart-common';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Output() valueChange = new EventEmitter();
  clearCartArray:boolean = false;
  data:any;
  cartProdArray:any[];
  cartLength:number;
  cartTotal:number;
  bestDealVisibility:boolean = false;
  
  constructor( private dataShareService: DataShareService, private localStorageService: LocalStorageService) {
    this.dataShareService.shareDataSubject.subscribe(receivedData=> {
      this.cartProdArray = receivedData;
      this.cartLength = this.cartProdArray.length;
      this.doTotal();
      return this.data = { //objet
        "products" : receivedData,
        "totalCart" : this.cartTotal
      };
    });
  }

  ngOnInit(): void {
  }

  
    // Clear cart
  clearCart(cartProdArray):void{
    this.cartProdArray = cartProdArray;
    this.bestDealVisibility = false;
    this.cartProdArray = [];
    this.cartTotal = 0;
    //this.isVisible = false; //Todo
    this.valueChanged();
  }

  //valueChanged()
  valueChanged():void {  
    this.clearCartArray = true;
    this.localStorageService.setLocalstorage(1,"cartCleared");
    this.valueChange.emit(this.clearCartArray); 
  }

  doTotal():number{

    if(!this.cartLength){
    this.cartTotal = 0;
    }else{
      const add = (a:number, b:number) => a + b;
      let booksArray:Array<any> = this.cartProdArray.sort();
      let itemPriceArray:Array<any> = [];
      for (let k in booksArray){
        itemPriceArray.push(Number(booksArray[k].price));
      }
      this.cartTotal = itemPriceArray.reduce(add);
    }  
    return this.cartTotal;
  }

  displayBestDeal():boolean{
    return this.bestDealVisibility = true; 
  }

}
