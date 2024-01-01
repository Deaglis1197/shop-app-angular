import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryListComponent, CategoryCreateComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [CategoryListComponent, CategoryCreateComponent],
})
export class CategoriesModule {}
