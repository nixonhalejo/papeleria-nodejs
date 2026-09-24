import { CategoryRepository } from '../repositories/categories.repository.js';
import { ICategory } from '../models/category.model.js';

export class CategoryService {
  private repo = new CategoryRepository();

  getAll() {
    return this.repo.findAll();
  }

  getById(id: string) {
    return this.repo.findById(id);
  }

  create(data: Partial<ICategory>) {
    return this.repo.create(data);
  }

  update(id: string, data: Partial<ICategory>) {
    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}