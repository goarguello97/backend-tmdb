"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../config/token");
const CustomError_1 = __importDefault(require("../helpers/CustomError"));
const index_1 = require("../models/index");
class UserController {
    static getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            index_1.User.findAll({
                attributes: { exclude: ["password"] },
                include: { model: index_1.Movie, as: "favorites" },
            })
                .then((users) => {
                res.status(200).json(users);
            })
                .catch((err) => res.status(400).json(err));
        });
    }
    static getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            index_1.User.findOne({
                where: { email },
                attributes: { exclude: ["password"] },
                include: { model: index_1.Movie, as: "favorites" },
            })
                .then((user) => {
                res.status(200).json(user);
            })
                .catch((err) => res.status(400).json(err));
        });
    }
    static getUserWithId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            index_1.User.findByPk(id, {
                attributes: { exclude: ["password"] },
                include: { model: index_1.Movie, as: "favorites" },
            })
                .then((user) => {
                if (user === null)
                    return res.status(400).json({ message: "El usuario no existe." });
                res.status(200).json(user);
            })
                .catch((err) => res.status(400).json({ message: "El usuario no existe." }));
        });
    }
    static registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastname, email, password } = req.body;
            index_1.User.findOne({ where: { email } })
                .then((user) => {
                if (!user) {
                    index_1.User.create({
                        name,
                        lastname,
                        email,
                        password,
                    })
                        .then((user) => {
                        res.status(201).json({
                            message: "Usuario registrado satisfactoriamente.",
                            user,
                        });
                    })
                        .catch((err) => res.status(400).json(err));
                }
                else {
                    res.status(201).json({
                        message: "El usuario ya se encuentra registrado.",
                    });
                }
            })
                .catch((err) => res.status(400).json(err));
        });
    }
    static loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            index_1.User.findOne({ where: { email } })
                .then((user) => {
                if (!user)
                    throw new CustomError_1.default("Usuario no encontrado", 404);
                const isValid = user.validatePassword(password);
                if (!isValid)
                    throw new CustomError_1.default("Credenciales inválidas", 401);
                const payload = {
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname,
                    id: user.id,
                };
                const token = (0, token_1.generateToken)(payload);
                res.status(200).json({ payload, token });
            })
                .catch((error) => {
                res.status(error.status || 401).json({ message: error.message });
            });
        });
    }
    static updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, lastname, email, password } = req.body;
            index_1.User.findByPk(id)
                .then((user) => {
                user.name = name;
                user.lastname = lastname;
                user.email = email;
                user.password = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
                user.save();
                index_1.User.findByPk(id, {
                    attributes: { exclude: ["password"] },
                    include: { model: index_1.Movie, as: "favorites" },
                }).then((userUpdated) => {
                    res.status(202).json({
                        message: "Usuario modificado correctamente.",
                        userUpdated,
                    });
                });
            })
                .catch((err) => {
                res.status(400).json(err);
            });
        });
    }
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            index_1.User.destroy({ where: { id } })
                .then(() => {
                res.status(200).json({ message: "El usuario ha sido eliminado" });
            })
                .catch((err) => {
                res.status(400).json(err);
            });
        });
    }
    static addFav(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId, movieTitle, movieDate, movieGenre, email, typeFilm } = req.body;
            index_1.Movie.findOrCreate({
                where: { movieId },
                defaults: {
                    movieId,
                    movieTitle,
                    movieDate,
                    movieGenre,
                    typeFilm,
                },
            }).then((response) => {
                const movie = response[0];
                index_1.User.findOne({
                    where: { email },
                    include: { model: index_1.Movie, as: "favorites" },
                }).then((user) => {
                    if (user.favorites.find((e) => e.movieId == movieId)) {
                        res.status(200).json({ message: "Ya se encuentra en favoritos." });
                    }
                    else {
                        user.addFavorites(movie);
                        res
                            .status(200)
                            .json({ message: "Agregada a favoritos satisfactoriamente." });
                    }
                });
            });
        });
    }
    static remFav(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId, movieTitle, movieDate, movieGenre, email, typeFilm } = req.body;
            index_1.Movie.findOrCreate({
                where: { movieId },
                defaults: {
                    movieId,
                    movieTitle,
                    movieDate,
                    movieGenre,
                    typeFilm,
                },
            }).then((response) => {
                const movie = response[0];
                index_1.User.findOne({
                    where: { email },
                    include: { model: index_1.Movie, as: "favorites" },
                }).then((user) => {
                    if (user.favorites.find((e) => e.movieId == movieId)) {
                        user.removeFavorites(movie);
                        res
                            .status(200)
                            .json({ message: "Removida de favoritos satisfactoriamente." });
                    }
                    else {
                        res
                            .status(200)
                            .json({ message: "No esta en tu lista de favoritos." });
                    }
                });
            });
        });
    }
    static secret(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user.user;
            index_1.User.findByPk(id)
                .then((user) => {
                if (!user)
                    throw new CustomError_1.default("Usuario no encontrado", 404);
                res.status(200).json(req.user);
            })
                .catch((err) => res.status(500).json({ message: err.message }));
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controllers.js.map