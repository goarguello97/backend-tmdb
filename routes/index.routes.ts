import express from "express";
import userRouter from "./user.routes";
import movieRouter from "./movies.routes";
const router = express.Router();

router.use("/users", userRouter);
router.use("/movies", movieRouter);

export default router;
