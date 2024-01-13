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
exports.getAll = exports.remove = exports.update = exports.get = exports.create = void 0;
const UserService = __importStar(require("../services/user.service"));
const errorHandler_util_1 = __importDefault(require("../utils/errorHandler.util"));
/**
 * @desc create user
 * @route /users
 * @method POST
 */
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserService.createUser(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.create = create;
/**
 * @desc Get a user
 * @route /users/:id
 * @method GET
 */
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserService.getUser(req.params.id);
        if (!user)
            return res.status(404).json({ message: "user not found" });
        return res.status(200).json(user);
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.get = get;
/**
 * @desc Update a user
 * @route /users/:id
 * @method PATCH
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield UserService.updateUser(req.params.id, req.body);
        res.status(204).json(result);
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.update = update;
/**
 * @desc Delete a user
 * @route /users/:id
 * @method DETETE
 */
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield UserService.removeUser(req.params.id);
        res.status(204).json(result);
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.remove = remove;
/**
 * @desc Get all user
 * @route /users
 * @method GET
 */
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserService.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        (0, errorHandler_util_1.default)(error, req, res);
    }
});
exports.getAll = getAll;
