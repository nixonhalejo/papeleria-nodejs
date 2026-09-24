import { connectDB, disconnectDB } from './lib/mongoose.js';
import { CategoryModel } from './models/category.model.js';
import { ProductModel } from './models/product.model.js';

const seed = async () => {
  await connectDB();

  console.log('🗑️ Limpiando colecciones en MongoDB...');
  await ProductModel.deleteMany({});
  await CategoryModel.deleteMany({});

  console.log('📦 Creando Categorías...');
  const categories = await CategoryModel.insertMany([
    { name: 'Escritura', description: 'Bolígrafos, lápices y marcadores' },
    { name: 'Cuadernos y Papel', description: 'Cuadernos, resmas y blocs' },
    { name: 'Oficina', description: 'Cosedoras, carpetas y organizadores' },
  ]);

  console.log('🛍️ Creando Productos...');
  await ProductModel.insertMany([
    { name: 'Bolígrafo Gel Negro', sku: 'BOL-GEL-01', price: 1800, stock: 100, category: categories[0]._id },
    { name: 'Cuaderno 100 Hojas Argollado', sku: 'CUA-100-ARG', price: 9500, stock: 50, category: categories[1]._id },
  ]);

  console.log('✅ Seed de MongoDB completado.');
  await disconnectDB();
};

seed().catch(err => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});