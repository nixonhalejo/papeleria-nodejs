import { Router } from 'express';
import { CategoryController } from '../controllers/categories.controller.js';

export const categoriesRouter = Router();

categoriesRouter.get('/', CategoryController.getAll);
categoriesRouter.get('/:id', CategoryController.getById);
categoriesRouter.post('/', CategoryController.create);
categoriesRouter.put('/:id', CategoryController.update);
categoriesRouter.delete('/:id', CategoryController.delete);