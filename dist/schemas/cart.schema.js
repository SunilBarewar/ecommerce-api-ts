"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSchema = void 0;
const zod_1 = require("zod");
const productSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number(),
});
exports.CartSchema = zod_1.z.object({
    products: zod_1.z.array(productSchema).default([]),
    userId: zod_1.z.string(), // Assuming ObjectId is represented as a string
});
