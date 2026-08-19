import * as productsRepository from "../repositories/products.repository.js";
import { AppError } from "../errors/AppError.js";
import type { Product } from "../types.js";
import type { CreateProductInput, UpdateProductInput } from "../schemas/product.schema.js";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/** Lista productos con paginación. */
export async function listProducts(page: number, limit: number): Promise<PaginatedResult<Product>> {
  const all = await productsRepository.findAll();

  const total = all.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = all.slice(start, end);

  return { data, total, page, limit };
}

/** Obtiene un producto por id. Lanza AppError 404 si no existe. */
export async function getProductById(id: number): Promise<Product> {
  const product = await productsRepository.findById(id);

  if (!product) {
    throw new AppError(404, `Producto ${id} no encontrado.`);
  }

  return product;
}

/** Crea un producto nuevo (los datos ya vienen validados por Zod). */
export async function createProduct(data: CreateProductInput): Promise<Product> {
  return productsRepository.create(data);
}

/** Actualiza un producto existente. Lanza AppError 404 si no existe. */
export async function updateProduct(id: number, data: UpdateProductInput): Promise<Product> {
  const updated = await productsRepository.update(id, data);

  if (!updated) {
    throw new AppError(404, `Producto ${id} no encontrado.`);
  }

  return updated;
}

/** Elimina un producto existente. Lanza AppError 404 si no existe. */
export async function deleteProduct(id: number): Promise<void> {
  const deleted = await productsRepository.remove(id);

  if (!deleted) {
    throw new AppError(404, `Producto ${id} no encontrado.`);
  }
}