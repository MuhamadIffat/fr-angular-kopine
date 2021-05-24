import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartServiceEvent = new BehaviorSubject({});
  cartQty = 0;
  cartObj = [];
  public cartTotalPrice :any;
  constructor(private http : HttpService) {
    this.getCartDetailsByUser();
   }

  getCartDetailsByUser(){
    this.http.postRequestWithToken("api/addtocart/getCartsByUserId",{}).subscribe((data: any) => {
      this.cartObj = data;
      this.cartQty = data.length;
      this.cartTotalPrice = this.getTotalAmountOfTheCart();
      this.cartServiceEvent.next({"status":"completed"})
    },
    error => {
      alert("Error while fetching the cart Details");
    })
  }

  addCart(obj){
    var request  = {
      "productId":obj.productId,
      "qty":obj.qty,
      "price":obj.price
    }

    this.http.postRequestWithToken("api/addtocart/addProduct",request).subscribe((data: any) =>{
      this.getCartDetailsByUser();
    },
    error => {
      alert("Error in addCart API"+error.message);
    })
  }

  getCartObj(){
    return this.cartObj;
  }

  getTotalAmountOfTheCart(){
    let obj = this.cartObj;
    let totalPrice = 0;
    for(var o in obj){
      totalPrice = totalPrice +parseFloat(obj[o].price);
    }
    return totalPrice.toFixed(2);
  }

  getQty(){
   return this.cartQty;
  }

  removeCart(cartId){
    var request = {
      "productId":"dummy_val",
      "cartId":cartId,
  }
  this.http.postRequestWithToken("api/addtocart/removeProductFromCart",request).subscribe((data: any) =>{
    this.getCartDetailsByUser();
  },
  error =>{
    alert("Error while fetching the cart Details");
  })
  }

  getAllProducts(){
    this.http.postRequestWithToken("api/products",{}).subscribe(data =>{
      console.log(data);
    })
  }

}
