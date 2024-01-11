import { Schema, model } from "mongoose";

interface IProduct {
  title: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  category: string;
  discountPercentage: number;
  thumbnail: string;
  images: string[];
  brand: string;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, index: true },
  rating: { type: Number, required: true, index: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  brand: { type: String, required: true },
});

const ProductModel = model<IProduct>("product", productSchema);

export default ProductModel;
