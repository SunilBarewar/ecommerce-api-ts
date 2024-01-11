import { Router } from "express";
import * as cartController from "../controllers/cart.controller";
import verifyJwtToken from "../middleware/verifyJwtToken.middleware";

const router = Router();

router.route("/get").get(verifyJwtToken, cartController.get);
router.route("/add-product").patch(verifyJwtToken, cartController.addItem);
router
  .route("/delete-product/:productId")
  .delete(verifyJwtToken, cartController.removeItem);
router
  .route("/update-quantity/:productId")
  .patch(verifyJwtToken, cartController.updateQuantity);

export default router;
