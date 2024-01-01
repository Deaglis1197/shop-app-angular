import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductService],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.productService
        .getProducts(params['categoryId'])
        .subscribe((result) => {
          this.products = result;
          this.isLoading = false;
        });
    });
  }
}
