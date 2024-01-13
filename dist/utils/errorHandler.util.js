"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_utils_1 = require("./logger.utils");
const errorHandler = (err, req, res) => {
    const status = res.statusCode ? res.statusCode : 500; // server error
    (0, logger_utils_1.errorLogger)(err);
    res.status(status);
    res.json({ message: err.message });
};
exports.default = errorHandler;
