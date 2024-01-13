"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilterProducts = exports.validateProductGet = exports.validateProductDelete = exports.validateProductUpdate = exports.validateProductCreate = void 0;
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const product_schema_1 = require("../schemas/product.schema");
exports.validateProductCreate = (0, validate_middleware_1.default)(product_schema_1.CreateProductSchema);
exports.validateProductUpdate = (0, validate_middleware_1.default)(product_schema_1.UpdateProductSchema);
exports.validateProductDelete = (0, validate_middleware_1.default)(product_schema_1.DeleteProductSchema);
exports.validateProductGet = (0, validate_middleware_1.default)(product_schema_1.GetProductSchema);
exports.validateFilterProducts = (0, validate_middleware_1.default)(product_schema_1.FilterProductSchema);
