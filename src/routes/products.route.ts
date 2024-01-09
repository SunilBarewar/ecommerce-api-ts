import { Router } from "express";
import * as productController from "../controllers/product.controller";
import {
  validateFilterProducts,
  validateProductCreate,
  validateProductDelete,
  validateProductGet,
  validateProductUpdate,
} from "../validators/products.validator";
const router = Router();

router.route("/").get(validateFilterProducts, productController.getAll);

router.route("/").post(validateProductCreate, productController.create);

router.route("/:id").get(validateProductGet, productController.get);

router.route("/:id").patch(validateProductUpdate, productController.update);

router.route("/:id").delete(validateProductDelete, productController.remove);

export default router;
