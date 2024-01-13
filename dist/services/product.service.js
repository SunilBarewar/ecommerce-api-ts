"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.deleteProduct = exports.updateProduct = exports.findProduct = exports.findAllProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const findAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, search, sortBy, sortOrder } = query;
    const filter = {};
    if (category) {
        filter.category = category;
    }
    const searchQuery = {};
    if (search) {
        searchQuery.$or = [
            { name: { $regex: search, $options: "i" } },
            { desc: { $regex: search, $options: "i" } }, // Case-insensitive search on the 'desc' field
        ];
    }
    const finalQuery = Object.assign(Object.assign({}, filter), searchQuery);
    const sort = {};
    if (sortBy) {
        sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }
    const products = yield product_model_1.default.find(finalQuery).sort(sort).limit(20);
    return products;
});
exports.findAllProducts = findAllProducts;
const findProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findById(id);
});
exports.findProduct = findProduct;
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findByIdAndUpdate(id, data);
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findByIdAndDelete(id);
});
exports.deleteProduct = deleteProduct;
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (yield product_model_1.default.create(productData)).save()).toJSON();
});
exports.createProduct = createProduct;
