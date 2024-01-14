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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.getAllUsers = exports.removeUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const logger_utils_1 = require("../utils/logger.utils");
const cart_service_1 = require("./cart.service");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_model_1.default.create(userData);
        // create cart for a user
        const cart = yield (0, cart_service_1.createCart)();
        user.cartId = cart._id;
        yield user.save();
        const _a = user.toJSON(), { password } = _a, rest = __rest(_a, ["password"]);
        return rest;
    }
    catch (error) {
        (0, logger_utils_1.errorLogger)(error);
        throw new Error("Email already exists");
    }
});
exports.createUser = createUser;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id).select("-password");
    return user === null || user === void 0 ? void 0 : user.toJSON();
});
exports.getUser = getUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findByIdAndUpdate(id, data);
});
exports.updateUser = updateUser;
const removeUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findByIdAndDelete(id);
});
exports.removeUser = removeUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.find().select("-password");
});
exports.getAllUsers = getAllUsers;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ email }).exec();
});
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=user.service.js.map