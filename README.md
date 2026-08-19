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

## Semana 03 — API REST con Arquitectura en Capas

Refactor de la API a 4 capas: `routes → controllers → services → repositories`.

### Capas

- **repositories/** — única capa que toca los datos (el array en memoria). Todos los métodos `async`, con copias defensivas.
- **services/** — paginación y validaciones de dominio. Sin dependencias de Express.
- **controllers/** — extraer → llamar service → responder (3 pasos, sin lógica de negocio).
- **routes/** — solo mapeo URL → función del controller.

### Endpoints

Base: `/api/v1/products`

| Método | Ruta                | Status | Descripción                          | Auth |
|--------|---------------------|--------|----------------------------------------|------|
| GET    | `/`                 | 200    | Lista con paginación `?page&limit`     | No   |
| GET    | `/:id`              | 200    | Obtiene por id                          | No   |
| POST   | `/`                 | 201    | Crea nuevo producto                     | Sí   |
| PUT    | `/:id`              | 200    | Actualiza (merge parcial)               | Sí   |
| DELETE | `/:id`              | 204    | Elimina                                 | Sí   |

### Contratos de respuesta

\`\`\`json
// GET /products?page=1&limit=5 → 200
{ "data": [...], "total": 12, "page": 1, "limit": 5 }

// GET /products/1 → 200
{ "data": { "id": 1, "name": "...", ... } }

// POST /products → 201
{ "data": { "id": 13, "createdAt": "...", ... } }

// GET /products/999 → 404
{ "error": "Not Found", "message": "Item 999 not found" }
\`\`\`

### Variables de entorno

Copia `.env.example` (o crea `.env`) con:

\`\`\`
PORT=3000
\`\`\`

### Probado con

Thunder Client — los 5 endpoints verificados en sus status codes correctos (200, 201, 204, 404), incluyendo paginación y autenticación por API key.

## Semana 04 — Validación, Errores y Logging

### Validación con Zod

Schemas en `src/schemas/product.schema.ts`: `createProductSchema` (creación) y `updateProductSchema` (actualización, campos opcionales vía `.partial()`).

Reglas aplicadas: `name`/`category` no vacíos, `price` positivo, `stock`/`sales` enteros no negativos, `:id` validado como entero positivo con `z.coerce`.

### Manejo de errores

- `AppError` (`src/errors/AppError.ts`) — errores de aplicación con `statusCode` explícito.
- `errorHandler` centralizado distingue `ZodError` (400 + `issues[]`), `AppError` (su propio `statusCode`) y errores genéricos (500).
- `notFound` — middleware para rutas no registradas, responde 404 en JSON.

### Logging

Winston configurado en `src/config/logger.ts`: nivel `http` en desarrollo (colorizado), `warn` en producción (JSON + archivo `logs/error.log`). Morgan integrado vía stream personalizado.

### Probado con

Thunder Client — validación de body inválido (`issues[]`), id no numérico (400), id inexistente (404), ruta inexistente (404 JSON), y logs visibles en consola con Winston.