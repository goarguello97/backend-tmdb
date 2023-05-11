import { Schema } from "express-validator";
import checkUserExist from "../helpers/checkUserExist";

export const update: Schema = {
  id: {
    custom: { options: checkUserExist },
  },
  password: {
    optional: {options:{checkFalsy:true}},
    matches: {
      errorMessage:
        "Mínimo 8 caracteres, una mayúscula, un número y un carácter especial.",
      options: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    },
  },
};
