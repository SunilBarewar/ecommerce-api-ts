import { Router } from "express";
import * as orderController from "../controllers/orders.controller";
import verifyJwtToken from "../middleware/verifyJwtToken.middleware";

const router = Router();

router.post(
  "/create-checkout-session",
  verifyJwtToken,
  orderController.createCheckoutSession
);

router.post("/place-order", verifyJwtToken, orderController.placeOrder);

router.get("/session-status", verifyJwtToken, orderController.getSessionStatus);

export default router;
