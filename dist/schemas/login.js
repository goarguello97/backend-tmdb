"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
exports.login = {
    email: {
        notEmpty: { errorMessage: "El email es requerido." },
        isEmail: { errorMessage: "Ingrese un email válido." },
    },
    password: {
        notEmpty: { errorMessage: "La contraseña es requerida" }
    },
};
//# sourceMappingURL=login.js.map