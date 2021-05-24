import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-laporan-penjualan',
  templateUrl: './laporan-penjualan.component.html',
  styleUrls: ['./laporan-penjualan.component.scss']
})
export class LaporanPenjualanComponent implements OnInit {
  pageName="Kelola Pelanggan"
  orders: Order[];
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders():void{
    this.http.getAllOrder().subscribe(
      (response:Order[]) =>{
        this.orders = response;
        console.log(this.orders);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      } 
    )
  }

  exporToExcel(){
    this.http.getDataExcel().subscribe((responeMessage)=>{
      let file = new Blob([responeMessage],{type:'application/vnd.ms-excel'});
      var fileUrl = URL.createObjectURL(file);
      window.location.assign(fileUrl);
    })
  }
}
