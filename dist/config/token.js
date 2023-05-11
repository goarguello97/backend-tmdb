"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const SECRET = process.env.SECRET;
function generateToken(payload) {
    const token = jsonwebtoken_1.default.sign({ user: payload }, SECRET, { expiresIn: "15m" });
    return token;
}
exports.generateToken = generateToken;
function validateToken(token) {
    return jsonwebtoken_1.default.verify(token, SECRET);
}
exports.validateToken = validateToken;
//# sourceMappingURL=token.js.map