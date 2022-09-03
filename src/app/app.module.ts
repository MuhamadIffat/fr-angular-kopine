import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { BestDealComponent } from './cart/best-deal/best-deal.component';
import { ModalComponent } from './widgets/modal/modal.component';
import { ProductComponent } from './product/product.component';
import { FilterdataPipe } from './pipes/filterdata.pipe';
import { DataShareService } from './services/data-share.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from './widgets/comments/comments.component';
import { SocialComponent } from './widgets/social/social.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TeamComponent } from './widgets/team/team.component';
import { ContactComponent } from './contact/contact.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductWidgetComponent } from './widgets/product-widget/product-widget.component';
import { NewsletterComponent } from './footer/newsletter/newsletter.component';
import { InfosComponent } from './footer/infos/infos.component';
import { CarrousselComponent } from './widgets/carroussel/carroussel.component';
import { MobileNavComponent } from './header/mobile-nav/mobile-nav.component';
import { MarketingComponent } from './widgets/marketing/marketing.component';
import { FeaturedComponent } from './widgets/featured/featured.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './widgets/slider/slider.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactFormComponent } from './widgets/contact-form/contact-form.component';
import { LocalStorageService } from './shared/services/local-storage.service';
import { NewsComponent } from './widgets/news/news.component';
import { PostsComponent } from './sidebar/posts/posts.component';
import { BannerComponent } from './widgets/banner/banner.component';
import { BreadcrumbComponent } from './widgets/breadcrumb/breadcrumb.component';
import { BlogComponent } from './blog/blog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsModule } from './widgets/widgets.module';
import { LoginComponent } from './login/login.component';
import { RegistrasiComponent } from './registrasi/registrasi.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FormComponent } from './admin-panel/form/form.component';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    BestDealComponent,
    ModalComponent,
    ProductComponent,
    FilterdataPipe,
    CommentsComponent,
    SocialComponent,
    AboutUsComponent,
    TeamComponent,
    ContactComponent,
    SidebarComponent,
    ProductWidgetComponent,
    NewsletterComponent,
    InfosComponent,
    CarrousselComponent,
    MobileNavComponent,
    MarketingComponent,
    FeaturedComponent,
    HomeComponent,
    SliderComponent,
    ProfileComponent,
    ContactFormComponent,
    NewsComponent,
    PostsComponent,
    BannerComponent,
    BreadcrumbComponent,
    BlogComponent,
    WidgetsComponent,
    LoginComponent,
    RegistrasiComponent,
    AdminPanelComponent,
    FormComponent,
    CheckoutComponent,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    WidgetsModule,
    CommonModule,
    AdminPanelModule,
    AuthModule
  ],  
  // ApiService,DataShareService,LocalStorageService
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
