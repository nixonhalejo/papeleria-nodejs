import type { Product, Summary } from "./types.js";

/** Calcula el resumen estadístico de un conjunto de productos. */
export function buildSummary(products: Product[], allProducts: Product[]): Summary {
  const activos = products.filter((p) => p.available).length;
  const inactivos = products.length - activos;

  const precioPromedio =
    products.length === 0
      ? 0
      : Math.round(
          (products.reduce((sum, p) => sum + p.price, 0) / products.length) * 100
        ) / 100;

  const masCaro =
    products.length === 0
      ? null
      : products.reduce((max, p) => (p.price > max.price ? p : max), products[0]);

  const masBarato =
    products.length === 0
      ? null
      : products.reduce((min, p) => (p.price < min.price ? p : min), products[0]);

  const categoriasDisponibles = [...new Set(allProducts.map((p) => p.category))].sort();

  return {
    total: products.length,
    activos,
    inactivos,
    precioPromedio,
    masCaro,
    masBarato,
    categoriasDisponibles,
  };
}