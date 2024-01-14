"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    products: {
        type: [
            {
                productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "product" },
                quantity: Number,
            },
        ],
        default: [],
    },
});
const CartModel = (0, mongoose_1.model)("cart", cartSchema);
exports.default = CartModel;
//# sourceMappingURL=cart.model.js.map