import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { BlogComponent } from './blog/blog.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrasiComponent } from './registrasi/registrasi.component';

const routes: Routes = [
  {path: '', redirectTo : 'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'shop', component: ProductComponent,data:{requiresLogin:true}},
  {path: 'about', component: AboutUsComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'profil', component: ProfileComponent},
  {path: 'checkout' , component: CheckoutComponent},
  {path: 'widgets', loadChildren:()=> import('./widgets/widgets.module')
      .then(mod=> mod.WidgetsModule)},
  {path: 'login', component: LoginComponent},
  {path:'register', component: RegistrasiComponent},
  {path: 'admin', loadChildren:()=>import('./admin-panel/admin-panel.module')
          .then(mod=>mod.AdminPanelModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
