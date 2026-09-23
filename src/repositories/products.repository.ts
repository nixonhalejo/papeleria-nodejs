import { prisma } from '../lib/prisma.js';
import { AppError } from '../errors/AppError.js';
import { Prisma } from '@prisma/client';

export class ProductsRepository {
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count(),
    ]);

    return { data, total, page, limit };
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new AppError(404, 'Producto no encontrado');
    }

    return product;
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    try {
      return await prisma.product.create({
        data,
        include: { category: true },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.ProductUncheckedUpdateInput) {
    try {
      return await prisma.product.update({
        where: { id },
        data,
        include: { category: true },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async delete(id: string) {
    try {
      await prisma.product.delete({ where: { id } });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new AppError(404, 'Recurso no encontrado');
      }
      if (error.code === 'P2002') {
        throw new AppError(409, 'Ya existe un registro con ese valor en un campo único');
      }
      if (error.code === 'P2003') {
        throw new AppError(400, 'La categoría especificada (categoryId) no existe');
      }
    }
    throw error;
  }
}