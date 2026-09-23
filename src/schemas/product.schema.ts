import { z } from 'zod';

export const productParamSchema = z.object({
  id: z.string().uuid({ message: 'El ID debe ser un UUID válido' }),
});

export const createProductSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  price: z.number().positive({ message: 'El precio debe ser un número positivo' }),
  stock: z.number().int().nonnegative({ message: 'El stock debe ser entero >= 0' }).optional(),
  sales: z.number().int().nonnegative({ message: 'Las ventas deben ser entero >= 0' }).optional(),
  available: z.boolean().optional(),
  categoryId: z.string().uuid({ message: 'El categoryId debe ser un UUID válido' }),
});

export const updateProductSchema = createProductSchema.partial();

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});