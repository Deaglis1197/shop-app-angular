import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  providers: [CategoryService, ProductService],
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
  model: any = {
    name: '',
    price: 0,
    imageUrl: '.jpeg',
    description: '',
    isActive: false,
    categoryId: 0,
  };
  error: string = '';
  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  saveProduct(form: NgForm) {
    const extensions = ['jpeg', 'jpg', 'png'];
    const extension = this.model.imageUrl.split('.');
    this.error = '';
    if (this.model.categoryId == '0') {
      this.error += "Category didn't select! ";
    }
    if (extension.length != 2) {
      this.error += 'Wrong image name ! ';
    }
    if (extensions.indexOf(extension.pop()) == -1) {
      this.error += 'Image extension not support ! ';
    }
    if (form.valid && this.error == '') {
      const product = {
        id: 1,
        name: this.model.name,
        price: this.model.price,
        imageUrl: this.model.imageUrl,
        description: this.model.description,
        isActive: this.model.isActive,
        categoryId: this.model.categoryId,
      };
      this.productService.createProduct(product).subscribe((data) => {
        this.router.navigate(['/products']);
      });
    } else {
      return;
    }
  }
}
