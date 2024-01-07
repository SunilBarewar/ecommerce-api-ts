import UserModel from "../models/user.model";
import { CreateUserDto, UpdateUserDto } from "../schemas/user.schema";
import { errorLogger } from "../utils/logger.utils";

export const createUser = async (userData: CreateUserDto["body"]) => {
  try {
    let user = await UserModel.create(userData);
    await user.save();
    const{password,...rest} =  user.toJSON();
    return rest;
  } catch (error: any) {
    errorLogger(error);
  }
};

export const getUser = async (id: string) => {
  try {
    const user = await UserModel.findById(id).select("-password");

    return user?.toJSON();
  } catch (error: any) {
    errorLogger(error);
  }
};

export const updateUser = async (id: string, data: UpdateUserDto["body"]) => {
  try {
    console.log(data);
    return await UserModel.findByIdAndUpdate(id, data);
  } catch (error: any) {
    errorLogger(error);
  }
};

export const removeUser = async (id: string) => {
  try {
    return await UserModel.findByIdAndDelete(id);
  } catch (error: any) {
    errorLogger(error);
  }
};

export const getAllUsers = async () => {
  try {
    return await UserModel.find().select("-password");
  } catch (error: any) {
    errorLogger(error);
  }
};
