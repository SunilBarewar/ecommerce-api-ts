import UserModel from "../models/user.model";
import { CreateUserDto, UpdateUserDto } from "../schemas/user.schema";
import { errorLogger } from "../utils/logger.utils";
import { createCart } from "./cart.service";

export const createUser = async (userData: CreateUserDto["body"]) => {
  try {
    let user = await UserModel.create(userData);
    // create cart for a user
    const cart = await createCart();

    user.cartId = cart._id;

    await user.save();

    const { password, ...rest } = user.toJSON();
    return rest;
  } catch (error: any) {
    errorLogger(error);
    throw new Error("Email already exists");
  }
};

export const getUser = async (id: string) => {
  const user = await UserModel.findById(id).select("-password");

  return user?.toJSON();
};

export const updateUser = async (id: string, data: UpdateUserDto["body"]) => {
  return await UserModel.findByIdAndUpdate(id, data);
};

export const removeUser = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
};

export const getAllUsers = async () => {
  return await UserModel.find().select("-password");
};

export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email }).exec();
};
