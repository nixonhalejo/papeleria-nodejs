import { ProductRepository } from '../repositories/products.repository.js';
import { CategoryRepository } from '../repositories/categories.repository.js';
import { IProduct } from '../models/product.model.js';

export class ProductService {
  private productRepo = new ProductRepository();
  private categoryRepo = new CategoryRepository();

  getAll(page: number, limit: number) {
    return this.productRepo.findAll(page, limit);
  }

  getById(id: string) {
    return this.productRepo.findById(id);
  }

  async create(data: Partial<IProduct>) {
    if (data.category) {
      await this.categoryRepo.findById(data.category.toString());
    }
    return this.productRepo.create(data);
  }

  async update(id: string, data: Partial<IProduct>) {
    if (data.category) {
      await this.categoryRepo.findById(data.category.toString());
    }
    return this.productRepo.update(id, data);
  }

  delete(id: string) {
    return this.productRepo.delete(id);
  }
}