"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../config/token");
const CustomError_1 = __importDefault(require("../helpers/CustomError"));
function validateAuth(req, res, next) {
    try {
        const token = req.header("authorization");
        if (!token)
            throw new CustomError_1.default("No hay una sesion existente", 401);
        const payload = (0, token_1.validateToken)(token);
        req.user = payload;
        if (payload)
            return next();
    }
    catch (error) {
        const { message } = error;
        res.status(401).json(message); // Unauthorized
    }
}
exports.default = validateAuth;
//# sourceMappingURL=auth.js.map