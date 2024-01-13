import { Schema, model, Types } from "mongoose";

interface IOrder {
  userId: Types.ObjectId;
  date: Date;
  items: [Object];
  payment_status: string;
  shipping_address: Object;
  payment_id: string;
}

const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  items: {
    type: [Object],
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
    required: true,
  },
});

const OrderModel = model<IOrder>("order", orderSchema);

export default OrderModel;
