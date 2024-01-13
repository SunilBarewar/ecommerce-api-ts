"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = exports.validateUserGet = exports.validateUserDelete = exports.validateUserUpdate = exports.validateUserCreate = void 0;
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const user_schema_1 = require("../schemas/user.schema");
exports.validateUserCreate = (0, validate_middleware_1.default)(user_schema_1.CreateUserSchema);
exports.validateUserUpdate = (0, validate_middleware_1.default)(user_schema_1.UpdateUserSchema);
exports.validateUserDelete = (0, validate_middleware_1.default)(user_schema_1.DeleteUserSchema);
exports.validateUserGet = (0, validate_middleware_1.default)(user_schema_1.GetUserSchema);
exports.validateUserLogin = (0, validate_middleware_1.default)(user_schema_1.LoginUserSchema);
