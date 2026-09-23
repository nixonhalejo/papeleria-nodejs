import { ProductsRepository } from '../repositories/products.repository.js';

export class ProductsService {
  constructor(private repository = new ProductsRepository()) {}

  async getAllProducts(page: number, limit: number) {
    return this.repository.findAll(page, limit);
  }

  async getProductById(id: string) {
    return this.repository.findById(id);
  }

  async createProduct(data: any) {
    return this.repository.create(data);
  }

  async updateProduct(id: string, data: any) {
    await this.repository.findById(id);
    return this.repository.update(id, data);
  }

  async deleteProduct(id: string) {
    await this.repository.findById(id);
    return this.repository.delete(id);
  }
}