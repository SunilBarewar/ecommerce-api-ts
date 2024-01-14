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
exports.updateQuantityOfProduct = exports.deleteProductFromCart = exports.addProductInCart = exports.getCart = exports.createCart = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const createCart = () => __awaiter(void 0, void 0, void 0, function* () {
    let products = [];
    const cartData = {
        products,
    };
    const cart = yield cart_model_1.default.create(cartData);
    yield cart.save();
    return cart.toJSON();
});
exports.createCart = createCart;
const getCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    let cart = yield cart_model_1.default.findById(cartId).populate("products.productId");
    const products = cart === null || cart === void 0 ? void 0 : cart.toJSON().products.map((product) => (Object.assign(Object.assign({}, product.productId), { quantity: product.quantity })));
    return products;
});
exports.getCart = getCart;
const addProductInCart = (cartId, product) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.default.findByIdAndUpdate(cartId, {
        $push: { products: product },
    });
});
exports.addProductInCart = addProductInCart;
const deleteProductFromCart = (cartId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.default.findByIdAndUpdate(cartId, {
        $pull: { products: { productId: productId } },
    });
});
exports.deleteProductFromCart = deleteProductFromCart;
const updateQuantityOfProduct = (cartId, productId, val) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.default.updateOne({ _id: cartId, "products.productId": productId }, {
        $inc: { "products.$.quantity": val },
    });
});
exports.updateQuantityOfProduct = updateQuantityOfProduct;
//# sourceMappingURL=cart.service.js.map