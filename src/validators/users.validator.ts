import validate from "../middleware/validate.middleware";
import {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserSchema,
  LoginUserSchema,
  UpdateUserSchema,
} from "../schemas/user.schema";

export const validateUserCreate = validate(CreateUserSchema);
export const validateUserUpdate = validate(UpdateUserSchema);
export const validateUserDelete = validate(DeleteUserSchema);
export const validateUserGet = validate(GetUserSchema);
export const validateUserLogin = validate(LoginUserSchema);
