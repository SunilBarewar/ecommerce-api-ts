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
exports.placeOrder = exports.getSessionStatus = exports.createCheckoutSession = void 0;
const stripe_1 = __importDefault(require("stripe"));
const errorHandler_util_1 = __importDefault(require("../utils/errorHandler.util"));
const order_service_1 = require("../services/order.service");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { products, from } = req.body;
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.title,
                    images: [product.thumbnail],
                },
                unit_amount: product.discountedPrice * 100,
            },
            quantity: product.quantity,
        }));
        const email = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.email) || "";
        const session = yield stripe.checkout.sessions.create({
            ui_mode: "embedded",
            payment_method_types: ["card"],
            line_items: lineItems,
            customer_email: email,
            mode: "payment",
            return_url: `http://localhost:5173/payment-status?session_id={CHECKOUT_SESSION_ID}&from=${from}`,
        });
        return res.status(200).json({ clientSecret: session.client_secret });
    }
    catch (error) {
        console.log(error);
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.createCheckoutSession = createCheckoutSession;
const getSessionStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const session = yield stripe.checkout.sessions.retrieve(req.query.session_id);
        return res.status(200).json({
            payment_status: session.status,
            payment_id: session.payment_intent,
            userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
        });
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.getSessionStatus = getSessionStatus;
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, order_service_1.createOrder)(req.body);
        res.status(204).end();
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.placeOrder = placeOrder;
