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

## Semana 02 — API REST con Express

Servidor Express 5 + TypeScript sobre el mismo dominio (Papelería), con datos en memoria.

### Cómo correr el servidor

\`\`\`bash
pnpm dev:server        # modo desarrollo, con recarga automática
pnpm build && pnpm start:server   # modo producción
\`\`\`

El servidor corre en `http://localhost:3000`.

### Endpoints

| Método | Ruta              | Descripción                        | Requiere auth |
|--------|-------------------|-------------------------------------|---------------|
| GET    | `/products`       | Lista todo el catálogo (admite `?category=`) | No |
| GET    | `/products/:id`   | Obtiene un producto por id          | No |
| POST   | `/products`       | Crea un producto nuevo              | Sí |
| PUT    | `/products/:id`   | Actualiza un producto (merge parcial) | Sí |
| DELETE | `/products/:id`   | Elimina un producto                 | Sí |

### Autenticación

Las rutas de escritura (POST, PUT, DELETE) requieren el header:

\`\`\`
x-api-key: papeleria-secret-2026
\`\`\`

Sin ese header → `401`. Con una key incorrecta → `403`.

### Middlewares aplicados

- `cors` — permite peticiones cross-origin
- `morgan` — logging estándar de peticiones
- `requestLogger` — logging personalizado con timestamp
- `express.json()` — parseo del body
- `fakeAuth` — autenticación ficticia por API key
- `errorHandler` — manejo centralizado de errores (500)

### Probado con

Thunder Client — todos los métodos y códigos de respuesta (200, 201, 401, 403, 404, 500) fueron verificados manualmente.