import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService],
})
export class ProductComponent {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['productId'];
      this.productService.getProductById(id).subscribe((result) => {
        this.product = { ...result, id: id };
      });
    });
  }
}
