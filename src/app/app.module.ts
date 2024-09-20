import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr, ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './Components/Login/Login.component';
import { ProductListComponentComponent } from './Components/ProductListComponent/ProductListComponent.component';
import { ProductDetailComponent } from './Components/ProductDetail/ProductDetail.component';
import { AddProductComponent } from './Components/AddProduct/AddProduct.component';
import { HeaderComponent } from './Components/Header/Header.component';
import { TokenInterceptor } from './Interceptor/token.interceptor';
import { UsersComponent } from './Components/Users/Users.component';
import { UserHistoryComponent } from './Components/UserHistory/UserHistory.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponentComponent,
    ProductDetailComponent,
    AddProductComponent,
    HeaderComponent,
    UsersComponent,
    UserHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,


  }
    // provideAnimations(), // required animations providers
    // provideToastr(), // Toastr providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
