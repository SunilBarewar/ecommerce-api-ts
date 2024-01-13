import OrderModel from "../models/order.model";

export const createOrder = async (order: any) => {
  return await (await OrderModel.create(order)).save();
};
export const getOrdersOfCustomer = async (userId: string) => {
  return await OrderModel.find({ userId });
};
