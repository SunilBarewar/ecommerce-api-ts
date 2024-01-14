"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    rating: { type: Number, required: true, index: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    discountPercentage: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    brand: { type: String, required: true },
});
const ProductModel = (0, mongoose_1.model)("product", productSchema);
exports.default = ProductModel;
//# sourceMappingURL=product.model.js.map