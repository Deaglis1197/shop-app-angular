import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, exhaustMap, map, take, tap } from 'rxjs';
import { Product } from './product.model';
import { AuthService } from '../authentication/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(environment.url + 'products.json').pipe(
      map((result) => {
        const products: Product[] = [];
        for (const key in result) {
          if (categoryId) {
            if (categoryId == result[key].categoryId)
              products.push({ ...result[key], id: key });
          } else {
            products.push({ ...result[key], id: key });
          }
        }
        return products;
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(environment.url + 'products/' + id + '.json');
  }

  createProduct(product: Product): Observable<Product> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.post<Product>(
          environment.url + 'products.json?auth=' + user?.token,
          product
        );
      })
    );
  }
}
