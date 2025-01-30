"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ValidationErrors {
    constructor() {
        this.service = express_validator_1.validationResult;
    }
}
const validateFields = (req, res, next) => {
    /* const { errors } = new ValidationErrors().service(req);
    if (errors.length !== 0) */
    const errors = (0, express_validator_1.validationResult)(req); // Aquí se obtiene el resultado de la validación
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errores: errors.array().length, errors: errors.array() });
    }
    next();
};
exports.default = validateFields;
//# sourceMappingURL=validateFields.js.map