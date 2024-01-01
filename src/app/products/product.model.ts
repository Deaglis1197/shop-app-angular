export interface Product {
  id: any;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  isActive: boolean;
  categoryId?: number;
}
