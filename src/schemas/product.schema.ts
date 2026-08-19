import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").trim(),
  category: z.string().min(1, "La categoría es obligatoria").trim(),
  price: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().int().nonnegative("El stock no puede ser negativo").default(0),
  sales: z.number().int().nonnegative().default(0),
  available: z.boolean().default(true),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;