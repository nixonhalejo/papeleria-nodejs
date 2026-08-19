import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import * as productsService from "../services/products.service.js";
import { createProductSchema, updateProductSchema } from "../schemas/product.schema.js";
import { AppError } from "../errors/AppError.js";

/** Valida que :id sea un entero positivo. */
const idParamSchema = z.coerce.number().int().positive();

/** GET /api/v1/products — lista con paginación */
export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await productsService.listProducts(page, limit);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

/** GET /api/v1/products/:id — obtiene uno por id */
export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const idResult = idParamSchema.safeParse(req.params.id);
    if (!idResult.success) {
      throw new AppError(400, "El id debe ser un número entero positivo.");
    }

    const product = await productsService.getProductById(idResult.data);
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
}

/** POST /api/v1/products — crea uno nuevo */
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const validated = createProductSchema.parse(req.body);
    const product = await productsService.createProduct(validated);
    res.status(201).json({ data: product });
  } catch (error) {
    next(error);
  }
}

/** PUT /api/v1/products/:id — actualiza uno existente */
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const idResult = idParamSchema.safeParse(req.params.id);
    if (!idResult.success) {
      throw new AppError(400, "El id debe ser un número entero positivo.");
    }

    const validated = updateProductSchema.parse(req.body);
    const product = await productsService.updateProduct(idResult.data, validated);
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
}

/** DELETE /api/v1/products/:id — elimina uno */
export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const idResult = idParamSchema.safeParse(req.params.id);
    if (!idResult.success) {
      throw new AppError(400, "El id debe ser un número entero positivo.");
    }

    await productsService.deleteProduct(idResult.data);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}