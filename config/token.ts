import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config({ path: "../.env" });

const SECRET = process.env.SECRET;

export function generateToken(payload: any) {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: "15m" });
  return token;
}

export function validateToken(token: string) {
  return jwt.verify(token, SECRET);
}

