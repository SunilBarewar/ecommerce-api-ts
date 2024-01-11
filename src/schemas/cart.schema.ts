import { z } from "zod";

const productSchema = z.object({
  productId: z.string(), // Assuming ObjectId is represented as a string
  quantity: z.number(),
});

export const CartSchema = z.object({
  products: z.array(productSchema).default([]),
  userId: z.string(), // Assuming ObjectId is represented as a string
});
