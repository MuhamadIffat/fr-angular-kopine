import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  page:string;
  productsList: any;
  categoryList: any;
  storageName:string;
  constructor(private cartService: CartService,
              private http: HttpService,
              ) { }

  ngOnInit(): void {
    this.page  = "shop";
    // this.http.postRequestWithToken("api/cates",{}).subscribe(data=>{
    //   this.categoryList = data;
    //   if(this.categoryList.length > 1)
    //     this.getProductsByCateogy(data[0])
    // },error=>{
    //   alert("Server connection error "+error)
    // })
    this.http.postRequestWithToken("api/getAllProducts",{}).subscribe(data =>{
      this.productsList = data;
    },
    error =>{
      alert("Server connection error "+error)
    })
    
  }
  addCart(cartProductObj){
    var cartObj = {
      "productId":cartProductObj.id,
      "qty":"1",
      "price":cartProductObj.price
    }
    this.cartService.addCart(cartObj);
  }

  // getProductsByCateogy(obj){
  //   let request ={
  //     "cat_id":obj.id
  //   }
  //  this.http.postRequestWithToken('api/getProductsByCategory',request).subscribe(data=>{
  //     this.productsList = data
  //     if(this.productsList.length == 0){
  //       alert("No Product is found..");
  //     }
  //  },error=>{
  //    alert("Error in login "+error);
  //  })
  // }




}