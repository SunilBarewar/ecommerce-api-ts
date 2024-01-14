"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController = __importStar(require("../controllers/product.controller"));
const products_validator_1 = require("../validators/products.validator");
const router = (0, express_1.Router)();
router.route("/").get(products_validator_1.validateFilterProducts, productController.getAll);
router.route("/").post(products_validator_1.validateProductCreate, productController.create);
router.route("/:id").get(products_validator_1.validateProductGet, productController.get);
router.route("/:id").patch(products_validator_1.validateProductUpdate, productController.update);
router.route("/:id").delete(products_validator_1.validateProductDelete, productController.remove);
exports.default = router;
//# sourceMappingURL=products.route.js.map