import { Schema, model } from "mongoose";

interface IProduct {
  name: string;
  desc: string;
  price: number;
  stock: number;
  rating: number;
  category: string;
  discount: number;
  thumbnail: string;
  images: string[];
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, index: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true, index: true },
  rating: { type: Number, required: true, index: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  discount: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
});

const ProductModel = model<IProduct>("product", productSchema);

export default ProductModel;
