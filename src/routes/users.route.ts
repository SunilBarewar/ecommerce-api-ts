import { Router } from "express";
import * as userController from "../controllers/users.controller";
import {
  validateUserCreate,
  validateUserDelete,
  validateUserGet,
  validateUserUpdate,
} from "../validators/users.validator";

const router = Router();

router
  .route("/")
  .post(validateUserCreate, userController.create)
  .get(userController.getAll);

router
  .route("/:id")
  .get(validateUserGet, userController.get)
  .patch(validateUserUpdate, userController.update)
  .delete(validateUserDelete, userController.remove);

export default router;
