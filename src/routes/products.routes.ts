import { Router, type Request, type Response } from "express";
import { products, getNextId } from "../data/products.js";
import type { Product } from "../types.js";
import { fakeAuth } from "../middlewares/auth.js";
export const productsRouter = Router();

/** GET /products — lista todo el catálogo, opcionalmente filtrado por categoría */
productsRouter.get("/", (req: Request, res: Response) => {
  const { category } = req.query;

  if (category) {
    const filtered = products.filter(
      (p) => p.category.toLowerCase() === String(category).toLowerCase()
    );
    return res.status(200).json(filtered);
  }

  res.status(200).json(products);
});

/** GET /products/:id — obtiene un producto por id */
productsRouter.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: `Producto con id ${id} no encontrado.` });
  }

  res.status(200).json(product);
});

/** POST /products — crea un producto nuevo */
productsRouter.post("/", fakeAuth, (req: Request, res: Response) => {
  const { name, category, price, stock, sales, available } = req.body;

  if (!name || !category || price === undefined) {
    return res.status(400).json({ error: "Los campos 'name', 'category' y 'price' son obligatorios." });
  }

  const newProduct: Product = {
    id: getNextId(),
    name,
    category,
    price,
    stock: stock ?? 0,
    sales: sales ?? 0,
    available: available ?? true,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

/** PUT /products/:id — actualiza un producto existente */
productsRouter.put("/:id", fakeAuth, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Producto con id ${id} no encontrado.` });
  }

  products[index] = { ...products[index], ...req.body, id };
  res.status(200).json(products[index]);
});

/** DELETE /products/:id — elimina un producto */
productsRouter.delete("/:id", fakeAuth, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Producto con id ${id} no encontrado.` });
  }

  const [deleted] = products.splice(index, 1);
  res.status(200).json({ message: "Producto eliminado.", producto: deleted });
});