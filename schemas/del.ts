import { Schema } from "express-validator";
import checkUserExist from "../helpers/checkUserExist";

export const del: Schema = {
  id: {
    custom: { options: checkUserExist },
  }
};

