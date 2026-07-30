# Papelería — Procesador de Datos con Node.js

Proyecto semanal del bootcamp **bc-expressjs** (`week-01-nodejs_fundamentals/3-proyecto`).

**Autor:** Nixon Hernán Alejo Baracaldo · Ficha 3228973A

## Dominio asignado: Papelería

Recurso principal: **Product**

| Campo       | Tipo      | Descripción                          |
|-------------|-----------|---------------------------------------|
| `id`        | number    | Identificador único                   |
| `name`      | string    | Nombre del producto                   |
| `category`  | string    | Categoría (cuadernos, escritura, papel, utiles, electronica) |
| `price`     | number    | Precio en COP                         |
| `stock`     | number    | Unidades disponibles en inventario    |
| `sales`     | number    | Unidades vendidas históricamente      |
| `available` | boolean   | Si el producto está activo para venta |

## Cómo correr el proyecto

\`\`\`bash
pnpm install

# Sin filtro — muestra el resumen completo
pnpm dev

# Con filtro por categoría
pnpm dev -- --category escritura

# Compilar y correr en modo producción
pnpm build
pnpm start -- --category papel
\`\`\`