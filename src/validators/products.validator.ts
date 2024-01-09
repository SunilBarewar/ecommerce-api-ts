import validate from "../middleware/validate.middleware";
import {
  CreateProductSchema,
  DeleteProductSchema,
  FilterProductSchema,
  GetProductSchema,
  UpdateProductSchema,
} from "../schemas/product.schema";

export const validateProductCreate = validate(CreateProductSchema);
export const validateProductUpdate = validate(UpdateProductSchema);
export const validateProductDelete = validate(DeleteProductSchema);
export const validateProductGet = validate(GetProductSchema);
export const validateFilterProducts = validate(FilterProductSchema);
