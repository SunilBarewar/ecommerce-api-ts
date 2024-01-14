"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setHeaderCredentials = (req, res, next) => {
    // res.header("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    next();
};
exports.default = setHeaderCredentials;
//# sourceMappingURL=setHeaderCredentials.middleware.js.map