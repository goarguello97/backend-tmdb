"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const checkUserExist_1 = __importDefault(require("../helpers/checkUserExist"));
exports.update = {
    id: {
        custom: { options: checkUserExist_1.default },
    },
    password: {
        optional: { options: { checkFalsy: true } },
        matches: {
            errorMessage: "Mínimo 8 caracteres, una mayúscula, un número y un carácter especial.",
            options: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        },
    },
};
//# sourceMappingURL=update.js.map