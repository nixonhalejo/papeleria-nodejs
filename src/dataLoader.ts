import { readFile } from "node:fs/promises";
import type { Product } from "./types.js";

/**
 * Lee y parsea el archivo JSON del catálogo de productos.
 * Termina el proceso con código 1 si el archivo no existe o el JSON es inválido.
 */
export async function loadProducts(filePath: string): Promise<Product[] | never> {
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.error(`❌ Error: no se encontró el archivo "${filePath}".`);
      console.error("   Verifica que exista data/products.json en la raíz del proyecto.");
    } else if (error instanceof SyntaxError) {
      console.error(`❌ Error: el archivo "${filePath}" no contiene JSON válido.`);
    } else {
      console.error(`❌ Error inesperado al leer "${filePath}":`, error);
    }
    process.exit(1);
  }
}