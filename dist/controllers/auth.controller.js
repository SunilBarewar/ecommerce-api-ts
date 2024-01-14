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
exports.logout = exports.refresh = exports.signup = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../services/user.service");
const generateAccessToken_util_1 = __importDefault(require("../utils/generateAccessToken.util"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_util_1 = __importDefault(require("../utils/errorHandler.util"));
/**
 * @desc login a user
 * @route /login
 * @method POST
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield (0, user_service_1.findUserByEmail)(req.body.email);
        if (!foundUser)
            return res.status(404).json({ message: "email doesn't exists" });
        const match = yield bcrypt_1.default.compare(req.body.password, foundUser.password);
        if (!match)
            return res.status(401).json({ message: "Wrong password" });
        sendTokenResponse(foundUser, res);
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.login = login;
/**
 * @desc register new user
 * @route /signin
 * @method POST
 */
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.createUser)(req.body);
        sendTokenResponse(user, res);
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.signup = signup;
/**
 * @desc refresh token
 * @route /refresh
 * @method GET
 */
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.status(401).json({ message: "Unauthorized" });
        const refreshToken = cookies.jwt;
        const generateRefreshToken = (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return res.status(403).json({ message: "Forbidden" });
            const foundUser = yield (0, user_service_1.getUser)(decoded.userId);
            if (!foundUser)
                return res.status(401).json({ message: "Unauthorized" });
            const accessToken = (0, generateAccessToken_util_1.default)(foundUser);
            res.status(200).json({ accessToken }).end();
        });
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, generateRefreshToken);
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.refresh = refresh;
/**
 * @desc logout user
 * @route /logout
 * @method POST
 */
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(204); //No content
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.status(200).json({ message: "Cookie cleared" }).end();
});
exports.logout = logout;
const sendTokenResponse = (user, res) => {
    //generating access token
    const accessToken = (0, generateAccessToken_util_1.default)(user);
    //create refresh token
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Send accessToken containing username and roles
    res.status(200).json({ accessToken }).end();
};
//# sourceMappingURL=auth.controller.js.map