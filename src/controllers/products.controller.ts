import { Request, Response, NextFunction } from 'express';
import { ProductsService } from '../services/products.service.js';
import {
  createProductSchema,
  updateProductSchema,
  productParamSchema,
  paginationQuerySchema,
} from '../schemas/product.schema.js';

export class ProductsController {
  constructor(private service = new ProductsService()) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = paginationQuerySchema.parse(req.query);
      const result = await this.service.getAllProducts(page, limit);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = productParamSchema.parse(req.params);
      const product = await this.service.getProductById(id);
      res.status(200).json({ data: product });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = createProductSchema.parse(req.body);
      const product = await this.service.createProduct(payload);
      res.status(201).json({ data: product });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = productParamSchema.parse(req.params);
      const payload = updateProductSchema.parse(req.body);
      const product = await this.service.updateProduct(id, payload);
      res.status(200).json({ data: product });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = productParamSchema.parse(req.params);
      await this.service.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}