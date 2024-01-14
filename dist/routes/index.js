"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const users_route_1 = __importDefault(require("./users.route"));
const products_route_1 = __importDefault(require("./products.route"));
const reviews_route_1 = __importDefault(require("./reviews.route"));
const orders_route_1 = __importDefault(require("./orders.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.default);
router.use("/users", users_route_1.default);
router.use("/cart", cart_route_1.default);
router.use("/products", products_route_1.default);
router.use("/orders", orders_route_1.default);
router.use("/reviews", reviews_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map