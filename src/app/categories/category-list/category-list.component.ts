import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [CategoryService],
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category | null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onCategorySelect(category?: Category) {
    if (this.selectedCategory == category) {
      this.selectedCategory = null;
      return;
    }
    if (category) this.selectedCategory = category;
    else this.selectedCategory = null;
  }
}
