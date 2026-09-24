import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  sku: string;
  price: number;
  stock: number;
  sales: number;
  available: boolean;
  category: Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    sales: { type: Number, default: 0, min: 0 },
    available: { type: Boolean, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

export const ProductModel = model<IProduct>('Product', productSchema);