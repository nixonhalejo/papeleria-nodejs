import { Router } from 'express';
import { ProductController } from '../controllers/products.controller.js';

export const productsRouter = Router();

productsRouter.get('/', ProductController.getAll);
productsRouter.get('/:id', ProductController.getById);
productsRouter.post('/', ProductController.create);
productsRouter.put('/:id', ProductController.update);
productsRouter.delete('/:id', ProductController.delete);