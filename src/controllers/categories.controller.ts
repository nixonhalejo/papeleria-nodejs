import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/categories.service.js';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema.js';

const service = new CategoryService();

export class CategoryController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await service.getAll();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await service.getById(req.params.id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = createCategorySchema.parse(req.body);
      const category = await service.create(validated);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = updateCategorySchema.parse(req.body);
      const category = await service.update(req.params.id, validated);
      res.json(category);
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