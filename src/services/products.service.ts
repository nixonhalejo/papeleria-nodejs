import * as productsRepository from "../repositories/products.repository.js";
import type { Product } from "../types.js";

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

/** Obtiene un producto por id. Lanza un error si no existe. */
export async function getProductById(id: number): Promise<Product> {
  const product = await productsRepository.findById(id);

  if (!product) {
    throw new NotFoundError(`Item ${id} not found`);
  }

  return product;
}

/** Valida y crea un producto nuevo. */
export async function createProduct(data: Omit<Product, "id" | "createdAt">): Promise<Product> {
  if (!data.name || !data.category || data.price === undefined) {
    throw new ValidationError("Los campos 'name', 'category' y 'price' son obligatorios.");
  }

  if (data.price < 0) {
    throw new ValidationError("El precio no puede ser negativo.");
  }

  return productsRepository.create(data);
}

/** Valida y actualiza un producto existente. */
export async function updateProduct(id: number, data: Partial<Product>): Promise<Product> {
  if (data.price !== undefined && data.price < 0) {
    throw new ValidationError("El precio no puede ser negativo.");
  }

  const updated = await productsRepository.update(id, data);

  if (!updated) {
    throw new NotFoundError(`Item ${id} not found`);
  }

  return updated;
}

/** Elimina un producto existente. */
export async function deleteProduct(id: number): Promise<void> {
  const deleted = await productsRepository.remove(id);

  if (!deleted) {
    throw new NotFoundError(`Item ${id} not found`);
  }
}

/** Error de dominio: recurso no encontrado. */
export class NotFoundError extends Error {}

/** Error de dominio: datos inválidos. */
export class ValidationError extends Error {}