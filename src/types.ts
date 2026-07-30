export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  available: boolean;
}

export interface Summary {
  total: number;
  activos: number;
  inactivos: number;
  precioPromedio: number;
  masCaro: Product | null;
  masBarato: Product | null;
  categoriasDisponibles: string[];
}

export interface Report {
  generadoEn: string;
  filtroCategoria: string | null;
  resumen: Summary;
  productos: Product[];
}