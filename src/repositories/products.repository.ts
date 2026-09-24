import { ProductModel, IProduct } from '../models/product.model.js';
import { AppError } from '../errors/AppError.js';

export class ProductRepository {
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      ProductModel.find().populate('category').skip(skip).limit(limit).exec(),
      ProductModel.countDocuments(),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<IProduct> {
    const product = await ProductModel.findById(id).populate('category').exec();
    if (!product) throw new AppError(404, 'Producto no encontrado');
    return product;
  }

  async create(data: Partial<IProduct>): Promise<IProduct> {
    const newProduct = new ProductModel(data);
    return await newProduct.save();
  }

  async update(id: string, data: Partial<IProduct>): Promise<IProduct> {
    const updated = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate('category');

    if (!updated) throw new AppError(404, 'Producto no encontrado para actualizar');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await ProductModel.findByIdAndDelete(id);
    if (!deleted) throw new AppError(404, 'Producto no encontrado para eliminar');
  }
}