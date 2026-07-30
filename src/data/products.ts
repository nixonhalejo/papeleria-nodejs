import type { Product } from "../types.js";

/**
 * Catálogo en memoria. Se modifica en tiempo de ejecución
 * mediante las rutas POST, PUT y DELETE.
 */
export const products: Product[] = [
  { id: 1, name: "Cuaderno cuadriculado 100 hojas", category: "cuadernos", price: 6500, stock: 40, sales: 120, available: true },
  { id: 2, name: "Cuaderno argollado profesional", category: "cuadernos", price: 12900, stock: 15, sales: 58, available: true },
  { id: 3, name: "Lápiz HB Faber-Castell", category: "escritura", price: 900, stock: 200, sales: 430, available: true },
  { id: 4, name: "Bolígrafo tinta negra 0.7mm", category: "escritura", price: 1800, stock: 0, sales: 310, available: false },
  { id: 5, name: "Marcador resaltador amarillo", category: "escritura", price: 2500, stock: 60, sales: 90, available: true },
  { id: 6, name: "Resma papel carta 500 hojas", category: "papel", price: 24900, stock: 25, sales: 76, available: true },
  { id: 7, name: "Block de notas adhesivas", category: "papel", price: 4200, stock: 55, sales: 145, available: true },
  { id: 8, name: "Cartulina pliego surtido", category: "papel", price: 1500, stock: 0, sales: 40, available: false },
  { id: 9, name: "Tijeras punta roma", category: "utiles", price: 3800, stock: 30, sales: 22, available: true },
  { id: 10, name: "Pegante en barra 40g", category: "utiles", price: 3200, stock: 45, sales: 88, available: true },
  { id: 11, name: "Calculadora científica", category: "electronica", price: 45000, stock: 8, sales: 15, available: true },
  { id: 12, name: "USB 32GB", category: "electronica", price: 22000, stock: 12, sales: 33, available: true },
];

/** Genera el siguiente id disponible (simple incremento sobre el máximo actual). */
export function getNextId(): number {
  return products.length === 0 ? 1 : Math.max(...products.map((p) => p.id)) + 1;
}