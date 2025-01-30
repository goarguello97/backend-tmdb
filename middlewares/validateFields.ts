import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

class ValidationErrors {
  public service: Function;
  constructor() {
    this.service = validationResult;
  }
}

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  /* const { errors } = new ValidationErrors().service(req);
  if (errors.length !== 0) */
  const errors = validationResult(req); // Aquí se obtiene el resultado de la validación
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errores: errors.array().length, errors: errors.array() });
  }
  next();
};

export default validateFields;
