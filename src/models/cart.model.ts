import { Schema, model, Types } from "mongoose";

export type cartItem = { productId: Types.ObjectId; quantity: number };

interface Icart {
  products: [cartItem];
}

const cartSchema = new Schema<Icart>({
  products: {
    type: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "product" },
        quantity: Number,
      },
    ],
    default: [],
  },
});

const CartModel = model<Icart>("cart", cartSchema);

export default CartModel;
