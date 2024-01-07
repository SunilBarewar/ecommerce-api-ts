import { Request, Response } from "express";
import {
  CreateUserDto,
  DeleteUserDto,
  GetUserDto,
  UpdateUserDto,
} from "../schemas/user.schema";
import * as UserService from "../services/user.service";
import errorHandler from "../utils/errorHandler.util";

/**
 * @desc create user
 * @route /users
 * @method POST
 */
export const create = async (
  req: Request<{}, {}, CreateUserDto["body"]>,
  res: Response
) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

/**
 * @desc Get a user
 * @route /users/:id
 * @method GET
 */
export const get = async (
  req: Request<GetUserDto["params"]>,
  res: Response
) => {
  try {
    const user = await UserService.getUser(req.params.id);
    if (!user) return res.status(404).json({ message: "user not found" });

    return res.status(200).json(user);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

/**
 * @desc Update a user
 * @route /users/:id
 * @method PATCH
 */
export const update = async (
  req: Request<UpdateUserDto["params"], {}, UpdateUserDto["body"]>,
  res: Response
) => {
  try {
    const result = await UserService.updateUser(req.params.id, req.body);

    res.status(204).json(result);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

/**
 * @desc Delete a user
 * @route /users/:id
 * @method DETETE
 */
export const remove = async (
  req: Request<DeleteUserDto["params"]>,
  res: Response
) => {
  try {
    const result = await UserService.removeUser(req.params.id);
    res.status(204).json(result);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

/**
 * @desc Get all user
 * @route /users
 * @method GET
 */
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
