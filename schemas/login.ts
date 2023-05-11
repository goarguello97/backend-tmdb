import { Schema } from "express-validator";

export const login: Schema = {
  email: {
    notEmpty: { errorMessage: "El email es requerido." },
    isEmail: { errorMessage: "Ingrese un email válido." },
  },
  password: {
    notEmpty: { errorMessage: "La contraseña es requerida" }
  },
};


