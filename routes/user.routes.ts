import express from "express";
import { checkSchema } from "express-validator";
import UserControllers from "../controllers/user.controllers";
import { validateAuth, validateFields } from "../middlewares/index";
import { del, login, update, user } from "../schemas/index";
const router = express.Router();
const {
  getUsers,
  getUser,
  getUserWithId,
  registerUser,
  loginUser,
  secret,
  updateUser,
  deleteUser,
} = UserControllers;

router.get("/", getUsers);
router.get("/user", getUser);
router.get("/user/:id", getUserWithId);
router.post("/", checkSchema(user), validateFields, registerUser);
router.post("/login", checkSchema(login), validateFields, loginUser);
router.get("/secret/:token", validateAuth, secret);
router.put("/", checkSchema(update), validateFields, updateUser);
router.delete("/", checkSchema(del), validateFields, deleteUser);

export default router;
