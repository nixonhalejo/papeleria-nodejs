import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadProducts } from "./dataLoader.js";
import { buildSummary } from "./summary.js";
import type { Report } from "./types.js";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");
const OUTPUT_PATH = path.join(process.cwd(), "output", "report.json");

/** Extrae el valor de --category de process.argv, si fue pasado. */
function getCategoryArg(argv: string[]): string | null {
  const index = argv.indexOf("--category");
  if (index === -1 || index === argv.length - 1) return null;
  return argv[index + 1];
}

async function main() {
  const category = getCategoryArg(process.argv);

  console.log("📦 Procesador de Datos — Papelería\n");

  const products = await loadProducts(DATA_PATH);

  const resumenGeneral = buildSummary(products, products);

  console.log("📊 Resumen del catálogo:");
  console.log(`   Total de productos:     ${resumenGeneral.total}`);
  console.log(`   Activos / Inactivos:    ${resumenGeneral.activos} / ${resumenGeneral.inactivos}`);
  console.log(`   Precio promedio:        $${resumenGeneral.precioPromedio}`);
  console.log(`   Más caro:               ${resumenGeneral.masCaro?.name} ($${resumenGeneral.masCaro?.price})`);
  console.log(`   Más barato:             ${resumenGeneral.masBarato?.name} ($${resumenGeneral.masBarato?.price})`);

  let filtered = products;

  if (category) {
    filtered = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );

    if (filtered.length === 0) {
      console.warn(`\n⚠️  No se encontraron productos en la categoría "${category}".`);
      console.warn(`   Categorías disponibles: ${resumenGeneral.categoriasDisponibles.join(", ")}`);
    } else {
      console.log(`\n🔎 Filtrado por categoría "${category}": ${filtered.length} producto(s)`);
    }
  }

  const resumenFiltrado = buildSummary(filtered, products);

  const report: Report = {
    generadoEn: new Date().toISOString(),
    filtroCategoria: category,
    resumen: resumenFiltrado,
    productos: filtered,
  };

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(report, null, 2), "utf-8");

  console.log(`\n✅ Reporte generado en: ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main().catch((error) => {
  console.error("❌ Error inesperado:", error);
  process.exit(1);
});