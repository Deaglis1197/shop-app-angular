import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from './category.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.url + 'categories.json').pipe(
      map((result) => {
        const categories: Category[] = [];

        for (const key in result) {
          categories.push({ ...result[key], id: key });
        }
        return categories;
      })
    );
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(environment.url + 'categories.json', category);
  }
}
