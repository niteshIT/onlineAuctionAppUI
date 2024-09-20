import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/Login.component';
import { ProductListComponentComponent } from './Components/ProductListComponent/ProductListComponent.component';
import { ProductDetailComponent } from './Components/ProductDetail/ProductDetail.component';
import { AddProductComponent } from './Components/AddProduct/AddProduct.component';
import { authGuard } from './Gaurd/auth.guard';
import { UsersComponent } from './Components/Users/Users.component';
import { UserHistoryComponent } from './Components/UserHistory/UserHistory.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ProductListComponentComponent, canActivate: [authGuard()] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [authGuard()] },
  { path: 'userhistory/:id', component: UserHistoryComponent, canActivate: [authGuard()] },
  { path: 'addproduct', component: AddProductComponent, canActivate: [authGuard()] },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
