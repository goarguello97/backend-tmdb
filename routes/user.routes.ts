import express from "express";
const router = express.Router();
import { checkSchema } from "express-validator";
import { user, login, del, update } from "../schemas/index";
import UserControllers from "../controllers/user.controllers";
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
import { validateFields, validateAuth } from "../middlewares/index";

router.get("/", getUsers);
router.get("/user", getUser);
router.get("/user/:id", getUserWithId);
router.post("/", checkSchema(user), validateFields, registerUser);
router.post("/login", checkSchema(login), validateFields, loginUser);
router.get("/secret/:token", validateAuth, secret);
router.put("/", checkSchema(update), validateFields, updateUser);
router.delete("/", checkSchema(del), validateFields, deleteUser);

export default router;
