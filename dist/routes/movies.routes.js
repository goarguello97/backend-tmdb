"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const movie_controllers_1 = __importDefault(require("../controllers/movie.controllers"));
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const { getPopular, getSpecific, getComedy, getHorror, getDrama, getOne } = movie_controllers_1.default;
const { addFav, remFav } = user_controllers_1.default;
router.get("/", getPopular);
router.get("/movie/:typeFilm/:id", getOne);
router.post("/search", getSpecific);
router.get("/comedy", getComedy);
router.get("/horror", getHorror);
router.get("/drama", getDrama);
router.post("/add", addFav);
router.post("/remove", remFav);
exports.default = router;
//# sourceMappingURL=movies.routes.js.map