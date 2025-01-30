"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = void 0;
const checkUserExist_1 = __importDefault(require("../helpers/checkUserExist"));
exports.del = {
    id: {
        custom: { options: checkUserExist_1.default },
    }
};
//# sourceMappingURL=del.js.map