import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { AdminGuard } from './authentication/admin.guard';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductComponent } from './products/product/product.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path:'', redirectTo:'/home',pathMatch:'full'},
  
  {
    path: 'category/create',
    component: CategoryCreateComponent,
    canActivate: [AdminGuard],
  },
  

  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
