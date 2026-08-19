import type { Request, Response, NextFunction } from "express";
import * as productsService from "../services/products.service.js";
import { NotFoundError, ValidationError } from "../services/products.service.js";

/** GET /api/v1/products — lista con paginación */
export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    // 1. extraer
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // 2. llamar service
    const result = await productsService.listProducts(page, limit);

    // 3. responder
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

/** GET /api/v1/products/:id — obtiene uno por id */
export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const product = await productsService.getProductById(id);
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
}

/** POST /api/v1/products — crea uno nuevo */
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;
    const product = await productsService.createProduct(data);
    res.status(201).json({ data: product });
  } catch (error) {
    next(error);
  }
}

/** PUT /api/v1/products/:id — actualiza uno existente */
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const product = await productsService.updateProduct(id, data);
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
}

/** DELETE /api/v1/products/:id — elimina uno */
export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await productsService.deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}