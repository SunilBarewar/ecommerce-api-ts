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
exports.get = exports.remove = exports.update = exports.create = exports.getAll = void 0;
const errorHandler_util_1 = __importDefault(require("../utils/errorHandler.util"));
const product_service_1 = require("../services/product.service");
/**
 * @desc get/filter  products
 * @route /products
 * @method GET
 */
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_service_1.findAllProducts)(req.query);
        return res.status(200).json({ products });
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.getAll = getAll;
/**
 * @desc create a product
 * @route /products
 * @method POST
 */
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_service_1.createProduct)(req.body);
        res.status(200).json({ product });
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.create = create;
/**
 * @desc update a product
 * @route /products/:id
 * @method PATCH
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, product_service_1.updateProduct)(req.params.id, req.body);
        res.status(204).end();
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.update = update;
/**
 * @desc delete a product
 * @route /products/:id
 * @method DETETE
 */
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, product_service_1.deleteProduct)(req.params.id);
        res.status(204).end();
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.remove = remove;
/**
 * @desc get a product
 * @route /products/:id
 * @method GET
 */
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_service_1.findProduct)(req.params.id);
        if (!product)
            return res.status(404).json({ message: "product not found" });
        res.status(200).json({ product });
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.get = get;
//# sourceMappingURL=product.controller.js.map