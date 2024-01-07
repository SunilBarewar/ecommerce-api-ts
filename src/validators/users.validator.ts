import validate from "../middleware/validate.middleware";
import {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserSchema,
  UpdateUserSchema,
} from "../schemas/user.schema";

export const validateUserCreate = validate(CreateUserSchema);
export const validateUserUpdate = validate(UpdateUserSchema);
export const validateUserDelete = validate(DeleteUserSchema);
export const validateUserGet = validate(GetUserSchema);
