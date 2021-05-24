import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { CartService } from '../services/cart.service';
import { DataShareService } from '../services/data-share.service';
import { HttpService } from '../services/http.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Toggle } from '../shared/toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  clearReceivedData:boolean = false;
  cart_qty = 0;
  cartObj = [];
  cartTotalPrice = 0;
  isVisible : boolean =false;
  mobileNavVis:boolean = false;
  mainDialogType = "";
  currentDropDownMenu = "";
  private roles: string[];
  isLogin = false;
  isLoginAdmin = false;
  welcomeUsername = this.http.getLoginDataByKey("name");
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor( private http: HttpService,
                private cartService: CartService,
                private router: Router) { 
    let request = {}
    if(this.http.isLogin()){
      this.isLogin = true;
    }
    if(this.http.isLogin()){
      if(this.welcomeUsername === "admin"){
        this.isLoginAdmin = true;
      }
      this.isLogin = true;
    }
    this.cartService.cartServiceEvent.subscribe(data=>{
      this.cart_qty = this.cartService.getQty();
    })
  }

 

  ngOnInit(): void {

    }

  openCheckoutModel(){
    this.cartObj = this.cartService.getCartObj();
    this.cartTotalPrice = this.cartService.cartTotalPrice;
    this.mainDialogType = "checkout";
  }

  closeDialog(){
    this.mainDialogType = "";
 }

 checkout_btn(){
  this.router.navigate(['checkout']);
 }


  curentDropDown(currentDropdownMenuName){
    if(this.currentDropDownMenu == currentDropdownMenuName){
      this.currentDropDownMenu = "";
    }else{
      this.currentDropDownMenu = currentDropdownMenuName;
    }
    
  }
}
