import { Request } from "express";

export interface user {
  name: string;
  lastname: string;
  email: string;
  password: string;
  salt?: string;
  id: string;
}

export interface AuthRequest extends Request {
  user: {
    user: {
      email: string;
      name: string;
      lastname: string;
      id: string;
    };
    iat: number;
    exp: number;
  };
  body: any;
  cookies: { token: string };
}
