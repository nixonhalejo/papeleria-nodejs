import { products, getNextId } from "../data/products.js";
import type { Product } from "../types.js";

/** Obtiene todos los productos (copia defensiva, para que nadie modifique el array original desde afuera). */
export async function findAll(): Promise<Product[]> {
  return [...products];
}

/** Busca un producto por id. Devuelve null si no existe. */
export async function findById(id: number): Promise<Product | null> {
  const product = products.find((p) => p.id === id);
  return product ? { ...product } : null;
}

/** Crea un producto nuevo y lo agrega al catálogo. */
export async function create(data: Omit<Product, "id" | "createdAt">): Promise<Product> {
  const newProduct: Product = {
    id: getNextId(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  products.push(newProduct);
  return { ...newProduct };
}

/** Actualiza un producto existente (merge parcial). Devuelve null si no existe. */
export async function update(id: number, data: Partial<Product>): Promise<Product | null> {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...data, id };
  return { ...products[index] };
}

/** Elimina un producto por id. Devuelve true si se eliminó, false si no existía. */
export async function remove(id: number): Promise<boolean> {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;

  products.splice(index, 1);
  return true;
}