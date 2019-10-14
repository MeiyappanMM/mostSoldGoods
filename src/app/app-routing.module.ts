import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes =[
  {path: '',component:DashboardComponent,canActivate:[AuthGuard]},
  {path: 'login',component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'product/add',component:AddProductComponent,canActivate:[AuthGuard]},
  {path: 'product/edit/:id',component:EditProductComponent,canActivate:[AuthGuard]},
  {path: 'product/:id',component:ProductsDetailsComponent,canActivate:[AuthGuard]},
  {path: '**',component:NotFoundComponent,canActivate:[AuthGuard]}
  // {path: '',component:},
]

@NgModule({
  providers: [AuthGuard],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {}
