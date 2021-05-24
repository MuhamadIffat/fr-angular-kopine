import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { KelolaPelangganComponent } from './kelola-pelanggan/kelola-pelanggan.component';
import { KelolaProdukComponent } from './kelola-produk/kelola-produk.component';
import { LaporanPenjualanComponent } from './laporan-penjualan/laporan-penjualan.component';
import { AdminPanelComponent } from './admin-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [KelolaPelangganComponent, KelolaProdukComponent, LaporanPenjualanComponent],
  exports: [],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminPanelModule { }
