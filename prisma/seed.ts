import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de datos...');

  const categories = [
    { name: 'Escritura', description: 'Bolígrafos, lápices y marcadores' },
    { name: 'Papel', description: 'Hojas, cuadernos y resmas' },
    { name: 'Útiles', description: 'Tijeras, pegantes y reglas' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  const escritura = await prisma.category.findUnique({ where: { name: 'Escritura' } });
  const papel = await prisma.category.findUnique({ where: { name: 'Papel' } });
  const utiles = await prisma.category.findUnique({ where: { name: 'Útiles' } });

  if (!escritura || !papel || !utiles) return;

  const products = [
    { name: 'Bolígrafo Gel Negro', price: 3500.00, stock: 150, sales: 45, categoryId: escritura.id },
    { name: 'Lápiz Mirado 2B', price: 1200.00, stock: 300, sales: 120, categoryId: escritura.id },
    { name: 'Cuaderno 100 Hojas Cosido', price: 8500.00, stock: 80, sales: 25, categoryId: papel.id },
    { name: 'Resma Hojas Letter 75g', price: 22000.00, stock: 40, sales: 10, categoryId: papel.id },
    { name: 'Tijera Escolar Punta Roma', price: 4500.00, stock: 60, sales: 18, categoryId: utiles.id },
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { name: prod.name },
      update: {},
      create: prod,
    });
  }

  console.log('✅ Seed finalizado correctamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });