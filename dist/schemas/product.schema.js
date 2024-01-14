"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductSchema = exports.DeleteProductSchema = exports.UpdateProductSchema = exports.PartialProductSchema = exports.CreateProductSchema = exports.FilterProductSchema = void 0;
const zod_1 = require("zod");
const body = zod_1.z.object({
    title: zod_1.z.string().min(1, "Name cannot be empty"),
    description: zod_1.z.string().min(10, "Name cannot be empty"),
    price: zod_1.z.number().min(1, "price cannot be zero"),
    stock: zod_1.z.number(),
    category: zod_1.z.string(),
    discountPercentage: zod_1.z.number(),
    thumbnail: zod_1.z.string(),
    images: zod_1.z.array(zod_1.z.string()),
    rating: zod_1.z.number(),
    brand: zod_1.z.string(),
});
const params = zod_1.z.object({
    id: zod_1.z.string({
        required_error: "id is required",
    }),
});
const query = zod_1.z.object({
    category: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
    sortBy: zod_1.z.string().optional(),
    sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
});
exports.FilterProductSchema = zod_1.z.object({
    query,
});
exports.CreateProductSchema = zod_1.z.object({
    body,
});
exports.PartialProductSchema = exports.CreateProductSchema.partial();
exports.UpdateProductSchema = zod_1.z.object({
    body: exports.PartialProductSchema,
    params,
});
exports.DeleteProductSchema = zod_1.z.object({
    params,
});
exports.GetProductSchema = zod_1.z.object({
    params,
});
//# sourceMappingURL=product.schema.js.map