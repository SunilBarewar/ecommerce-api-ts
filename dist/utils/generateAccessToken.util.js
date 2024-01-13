"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (userInfo) => {
    const accessToken = jsonwebtoken_1.default.sign({
        userInfo: {
            id: userInfo._id,
            role: userInfo.role,
            cartId: userInfo.cartId,
            email: userInfo.email,
        },
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2d" });
    return accessToken;
};
exports.default = generateAccessToken;
