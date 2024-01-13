"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwtToken = (req, res, next) => {
    try {
        const authToken = req.header("Authorization");
        if (!authToken) {
            return res
                .status(401)
                .json({ error: "Unauthorized - Missing Authorization header" });
        }
        const [, token] = authToken.split(" ");
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err)
                return res.status(403).json({ message: "Forbidden" });
            req.user = decoded.userInfo;
            next();
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.default = verifyJwtToken;
