import { Router } from "express";
import authRoutes from "./auth.route";
import usersRoutes from "./users.route";
import productsRoutes from "./products.route";
import reviewsRoutes from "./reviews.route";
import ordersRoutes from "./orders.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);
router.use("/reviews", reviewsRoutes);

export default router;
