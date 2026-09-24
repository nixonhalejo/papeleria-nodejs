import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/products.service.js';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema.js';

const service = new ProductService();

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await service.getAll(page, limit);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await service.getById(req.params.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = createProductSchema.parse(req.body);
      const product = await service.create(validated as any);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = updateProductSchema.parse(req.body);
      const product = await service.update(req.params.id, validated as any);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await service.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}