import express from "express";
const router = express.Router();
import MoviesController from "../controllers/movie.controllers";
import UserController from "../controllers/user.controllers";
const { getPopular, getSpecific, getComedy, getHorror, getDrama, getOne } =
  MoviesController;
const { addFav, remFav } = UserController;

router.get("/", getPopular);
router.get("/movie/:typeFilm/:id", getOne);
router.post("/search", getSpecific);
router.get("/comedy", getComedy);
router.get("/horror", getHorror);
router.get("/drama", getDrama);
router.post("/add", addFav);
router.post("/remove", remFav);

export default router;
