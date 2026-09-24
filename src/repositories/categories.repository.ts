import { CategoryModel, ICategory } from '../models/category.model.js';
import { AppError } from '../errors/AppError.js';

export class CategoryRepository {
  async findAll(): Promise<ICategory[]> {
    return CategoryModel.find().exec();
  }

  async findById(id: string): Promise<ICategory> {
    const category = await CategoryModel.findById(id).exec();
    if (!category) throw new AppError(404, 'Categoría no encontrada');
    return category;
  }

  async create(data: Partial<ICategory>): Promise<ICategory> {
    const category = new CategoryModel(data);
    return category.save();
  }

  async update(id: string, data: Partial<ICategory>): Promise<ICategory> {
    const updated = await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new AppError(404, 'Categoría no encontrada para actualizar');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await CategoryModel.findByIdAndDelete(id);
    if (!deleted) throw new AppError(404, 'Categoría no encontrada para eliminar');
  }
}