import { NextFunction, Response } from "express";
import { validateToken } from "../config/token";
import CustomError from "../helpers/CustomError";
import { AuthRequest } from "../interfaces/user.interface";

function validateAuth(
  req: AuthRequest | any,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.header("authorization");
    if (!token) throw new CustomError("No hay una sesion existente", 401);
    const payload: any = validateToken(token);
    req.user = payload;

    if (payload) return next();
  } catch (error) {
    const { message } = error;
    res.status(401).json(message); // Unauthorized
  }
}

export default validateAuth;
