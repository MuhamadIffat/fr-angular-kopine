import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { KelolaPelangganComponent } from './kelola-pelanggan/kelola-pelanggan.component';
import { KelolaProdukComponent } from './kelola-produk/kelola-produk.component';
import { LaporanPenjualanComponent } from './laporan-penjualan/laporan-penjualan.component';

const routes: Routes = [
  {path:'',component:AdminPanelComponent},
  {path:'kelola-pelanggan', component:KelolaPelangganComponent},
  {path: 'kelola-produk', component:KelolaProdukComponent},
  {path:'laporan-penjualan', component:LaporanPenjualanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
