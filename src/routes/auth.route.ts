import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import {
  validateUserCreate,
  validateUserLogin,
} from "../validators/users.validator";

const router = Router();

router.route("/login").post(validateUserLogin, authController.login);

router.route("/signup").post(validateUserCreate, authController.signup);

router.route("/refresh").get(authController.refresh);

router.route("/logout").post(authController.logout);

export default router;
