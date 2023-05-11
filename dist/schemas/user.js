"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const emailUnique_1 = __importDefault(require("../helpers/emailUnique"));
exports.user = {
    name: {
        notEmpty: { errorMessage: "El nombre es requerido." },
        isLength: {
            errorMessage: "Mínimo 3 caracteres y máximo 30 caracteres.",
            options: { min: 3, max: 30 },
        },
    },
    lastname: {
        notEmpty: { errorMessage: "El apellido es requerido." },
        isLength: {
            errorMessage: "Mínimo 3 caracteres y máximo 30 caracteres.",
            options: { min: 3, max: 30 },
        },
    },
    email: {
        notEmpty: { errorMessage: "El email es requerido." },
        isEmail: { errorMessage: "Ingrese un email válido." },
        custom: { options: emailUnique_1.default },
    },
    password: {
        matches: {
            errorMessage: "Mínimo 8 caracteres, una mayúscula, un número y un carácter especial.",
            options: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        },
    },
};
//# sourceMappingURL=user.js.map