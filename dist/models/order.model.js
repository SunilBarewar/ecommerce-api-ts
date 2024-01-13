"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    items: {
        type: [Object],
        required: true,
    },
    payment_status: {
        type: String,
        required: true,
    },
    payment_id: {
        type: String,
        required: true,
    },
});
const OrderModel = (0, mongoose_1.model)("order", orderSchema);
exports.default = OrderModel;
