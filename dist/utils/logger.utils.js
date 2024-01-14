"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = void 0;
const pino_1 = __importDefault(require("pino"));
const logger = (0, pino_1.default)({
    transport: {
        target: "pino-pretty",
    },
});
const errorLogger = (err) => {
    logger.error(err.message);
};
exports.errorLogger = errorLogger;
exports.default = logger;
//# sourceMappingURL=logger.utils.js.map