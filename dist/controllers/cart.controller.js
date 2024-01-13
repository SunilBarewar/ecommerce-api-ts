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
exports.updateQuantity = exports.removeItem = exports.addItem = exports.get = void 0;
const cart_service_1 = require("../services/cart.service");
const errorHandler_util_1 = __importDefault(require("../utils/errorHandler.util"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cartId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.cartId) || "";
        const cart = yield (0, cart_service_1.getCart)(cartId);
        return res.status(200).json({ cart });
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.get = get;
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const result = yield (0, cart_service_1.addProductInCart)(((_b = req.user) === null || _b === void 0 ? void 0 : _b.cartId) || "", req.body);
        res.status(204).json({ message: "product added into cart" });
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.addItem = addItem;
const removeItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const cartId = ((_c = req.user) === null || _c === void 0 ? void 0 : _c.cartId) || "";
        yield (0, cart_service_1.deleteProductFromCart)(cartId, req.params.productId);
        res.status(204).json({ message: "product deleted from cart" });
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.removeItem = removeItem;
const updateQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const cartId = ((_d = req.user) === null || _d === void 0 ? void 0 : _d.cartId) || "";
        yield (0, cart_service_1.updateQuantityOfProduct)(cartId, req.params.productId, req.body.val);
        res.status(204).json({ message: "updated product quantity" });
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.updateQuantity = updateQuantity;
