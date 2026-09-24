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
# Papelería — API RESTful y Procesador de Datos (Node.js + Express + TypeScript)

Proyecto del bootcamp **bc-expressjs** (Ficha 3228973A).  
**Autor:** Nixon Hernán Alejo Baracaldo  
**Dominio asignado:** Papelería

---

## 🛠️ Tecnologías y Herramientas

- **Runtime:** Node.js (ES Modules)
- **Lenguaje:** TypeScript
- **Framework:** Express v5
- **ORM:** Prisma v5.22.0
- **Base de Datos:** PostgreSQL 16 (vía Docker Desktop)
- **Validación:** Zod
- **Logging:** Winston + Morgan
- **Gestor de paquetes:** pnpm

---

## 📂 Estructura del Proyecto

```text
src/
├── controllers/    # Controladores de Express (manejo de req, res, next)
├── errors/         # Manejo centralizado de errores (AppError)
├── lib/            # Instancia global del cliente de Prisma
├── middlewares/    # Middlewares de loggeo, autenticación y error handler
├── repositories/   # Capa de datos con Prisma ORM
├── routes/         # Definición de rutas REST
├── schemas/        # Schemas de validación con Zod
├── services/       # Lógica de negocio
└── server.ts       # Punto de entrada de la aplicación HTTP

prisma/
├── schema.prisma   # Modelos de datos (Category, Product)
├── seed.ts         # Script de carga de datos iniciales
└── migrations/     # Historial de migraciones de PostgreSQL
# 📚 Proyecto Papelería - Semana 06: API REST con MongoDB y Mongoose

En esta semana se integró **MongoDB** como base de datos NoSQL utilizando el ORM/ODM **Mongoose**. Se implementó una arquitectura en capas (**Model, Repository, Service, Controller, Route**) junto con validaciones estáticas mediante **Zod** e interpolación/población de datos con `.populate()`.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** & **TypeScript**
- **Express.js** (Framework Web API REST)
- **MongoDB** & **Mongoose** (ODM para modelado de datos)
- **Zod** (Validación de esquemas y DTOs)
- **TSX** (Ejecución y retranspilación en vivo)

---

## 📁 Arquitectura y Estructura del Proyecto

```text
src/
├── lib/
│   └── mongoose.ts          # Configuración y conexión a MongoDB
├── models/
│   ├── category.model.ts    # Modelo e Interfaz Mongoose de Categoría
│   └── product.model.ts     # Modelo e Interfaz Mongoose de Producto
├── schemas/
│   ├── category.schema.ts   # Esqueletos Zod de validación para Categorías
│   └── product.schema.ts    # Esqueletos Zod de validación para Productos
├── repositories/
│   ├── categories.repository.ts  # Consultas directas Mongoose para Categorías
│   └── products.repository.ts    # Consultas directas Mongoose para Productos (con Paginación)
├── services/
│   ├── categories.service.ts     # Lógica de negocio para Categorías
│   └── products.service.ts       # Lógica de negocio y reglas para Productos
├── controllers/
│   ├── categories.controller.ts  # Controladores de solicitudes HTTP
│   └── products.controller.ts    # Controladores de solicitudes HTTP
├── routes/
│   ├── categories.routes.ts      # Endpoints para /api/categories
│   └── products.routes.ts        # Endpoints para /api/products
├── errors/
│   └── AppError.ts               # Manejo global de excepciones personalizadas
├── app.ts                        # Configuración de Express y Middlewares
├── server.ts                     # Punto de entrada y arranque del servidor
└── seed.ts                       # Script de siembra de datos iniciales en MongoDB

# 📚 Proyecto Papelería - Semana 07: Autenticación, Seguridad con JWT y RBAC

En esta semana se implementó la capa de **Autenticación y Autorización** del sistema mediante el uso de **JSON Web Tokens (JWT)**, hash de contraseñas con **Bcrypt**, cookies seguras `HttpOnly` para Refresh Tokens y control de acceso basado en roles (**RBAC**).

---

## 🛠️ Tecnologías e Instalaciones

- **jsonwebtoken**: Generación y verificación de Access Tokens (15m) y Refresh Tokens (7d).
- **bcryptjs**: Encriptación y comprobación de contraseñas de usuarios.
- **cookie-parser**: Lectura y gestión de cookies en solicitudes HTTP.
- **Zod**: Validaciones para esquemas de registro e inicio de sesión.

---

## 📁 Estructura del Módulo de Autenticación

```text
src/
├── controllers/
│   └── auth.controller.ts     # Manejo de peticiones /register y /login
├── middlewares/
│   ├── auth.middleware.ts     # Validación de Access Token Bearer
│   └── role.middleware.ts     # Restricción por rol (ADMIN / USER)
├── models/
│   └── user.model.ts          # Esquema Mongoose para la entidad User
├── repositories/
│   └── user.repository.ts     # Consultas de usuario en MongoDB
├── routes/
│   └── auth.routes.ts         # Definición de endpoints de autenticación
├── schemas/
│   └── auth.schema.ts         # Validaciones Zod de registro y login
├── services/
│   └── auth.service.ts        # Lógica de encriptación y emisión de tokens
├── types/
│   └── express.d.ts           # Extensión de tipos de Request para req.user
└── utils/
    └── jwt.ts                 # Funciones helper para Bcrypt y JWT

    # 📚 Proyecto Papelería - Semana 08: Seguridad Avanzada e Integral

En esta semana se implementó la capa de **seguridad avanzada** en la API REST mediante la integración de **Helmet** para el aseguramiento de cabeceras HTTP, **CORS** con una política de lista blanca (*whitelist*) dinámica, y control de tasa de peticiones (**Express Rate Limit**) para prevenir ataques de denegación de servicio (DDoS) y fuerza bruta.

---

## 🛠️ Tecnologías y Módulos de Seguridad

- **Helmet**: Middleware que configura cabeceras HTTP seguras para ocultar la tecnología base (`X-Powered-By`) y prevenir vulnerabilidades de Cross-Site Scripting (XSS) y Clickjacking.
- **CORS (Cross-Origin Resource Sharing)**: Restricción de acceso mediante una *whitelist* configurada explícitamente para dominios autorizados y habilitada para el envío seguro de cookies (`credentials: true`).
- **Express Rate Limit**: 
  - **Limitador Global**: Restringe el tráfico general a 100 peticiones por cada ventana de 15 minutos por IP.
  - **Limitador Estricto (Auth)**: Protege los endpoints de autenticación (`/api/v1/auth`) limitando a un máximo de 5 intentos por cada 15 minutos para bloquear ataques por fuerza bruta.

---

## 📁 Estructura del Módulo de Seguridad

```text
src/
└── config/
    └── security.ts      # Configuración centralizada de Helmet, CORS Whitelist y Rate Limits