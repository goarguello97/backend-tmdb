"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ValidationErrors {
    constructor() {
        this.service = express_validator_1.validationResult;
    }
}
const validateFields = (req, res, next) => {
    const { errors } = new ValidationErrors().service(req);
    if (errors.length !== 0)
        return res.status(400).json({ errores: errors.length, errors });
    next();
};
exports.default = validateFields;
//# sourceMappingURL=validateFields.js.map