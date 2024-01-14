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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController = __importStar(require("../controllers/cart.controller"));
const verifyJwtToken_middleware_1 = __importDefault(require("../middleware/verifyJwtToken.middleware"));
const router = (0, express_1.Router)();
router.route("/get").get(verifyJwtToken_middleware_1.default, cartController.get);
router.route("/add-product").patch(verifyJwtToken_middleware_1.default, cartController.addItem);
router
    .route("/delete-product/:productId")
    .delete(verifyJwtToken_middleware_1.default, cartController.removeItem);
router
    .route("/update-quantity/:productId")
    .patch(verifyJwtToken_middleware_1.default, cartController.updateQuantity);
exports.default = router;
//# sourceMappingURL=cart.route.js.map