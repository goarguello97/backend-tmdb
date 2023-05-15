import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { AuthRequest } from "../interfaces/user.interface";
import { generateToken } from "../config/token";
import { User, Movie } from "../models/index";
import CustomError from "../helpers/CustomError";

class UserController {
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    User.findAll({
      attributes: { exclude: ["password"] },
      include: { model: Movie, as: "favorites" },
    })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => res.status(400).json(err));
  }

  static async getUser(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    User.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
      include: { model: Movie, as: "favorites" },
    })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => res.status(400).json(err));
  }

  static async getUserWithId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: { model: Movie, as: "favorites" },
    })
      .then((user) => {
        if (user === null)
          return res.status(400).json({ message: "El usuario no existe." });
        res.status(200).json(user);
      })
      .catch((err) =>
        res.status(400).json({ message: "El usuario no existe." })
      );
  }

  static async registerUser(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, email, password } = req.body;
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          User.create({
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
        } else {
          res.status(201).json({
            message: "El usuario ya se encuentra registrado.",
          });
        }
      })
      .catch((err) => res.status(400).json(err));
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) throw new CustomError("Usuario no encontrado", 404);
        // return res.status(401).json({ message: "No existe el usuario" });
        const isValid = user.validatePassword(password);
        if (!isValid) throw new CustomError("Credenciales inválidas", 401);
        // return res.status(401).json({ message: "Contraseña incorrecta" });
        const payload = {
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          id: user.id,
        };

        const token = generateToken(payload);
        res.cookie("token", token, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
          domain: ".onrender.com",
        
        });
        res.status(200).json({ payload, token });
      })
      .catch((error) => {
        res.status(error.status || 401).json({ message: error.message });
      });
  }

  static async updateUser(req: AuthRequest, res: Response, next: NextFunction) {
    const { id, name, lastname, email, password } = req.body;
    User.findByPk(id)
      .then((user) => {
        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        user.save();
        User.findByPk(id, {
          attributes: { exclude: ["password"] },
          include: { model: Movie, as: "favorites" },
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
  }

  static async deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
    const { id } = req.body;
    User.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: "El usuario ha sido eliminado" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  static async addFav(req: Request, res: Response, next: NextFunction) {
    const { movieId, movieTitle, movieDate, movieGenre, email, typeFilm } =
      req.body;
    Movie.findOrCreate({
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
      User.findOne({
        where: { email },
        include: { model: Movie, as: "favorites" },
      }).then((user) => {
        if (user.favorites.find((e) => e.movieId == movieId)) {
          res.status(200).json({ message: "Ya se encuentra en favoritos." });
        } else {
          user.addFavorites(movie);
          res
            .status(200)
            .json({ message: "Agregada a favoritos satisfactoriamente." });
        }
      });
    });
  }

  static async remFav(req: Request, res: Response, next: NextFunction) {
    const { movieId, movieTitle, movieDate, movieGenre, email, typeFilm } =
      req.body;
    Movie.findOrCreate({
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
      User.findOne({
        where: { email },
        include: { model: Movie, as: "favorites" },
      }).then((user) => {
        if (user.favorites.find((e) => e.movieId == movieId)) {
          user.removeFavorites(movie);
          res
            .status(200)
            .json({ message: "Removida de favoritos satisfactoriamente." });
        } else {
          res
            .status(200)
            .json({ message: "No esta en tu lista de favoritos." });
        }
      });
    });
  }

  static async secret(req: AuthRequest, res: Response, next: NextFunction) {
    res.status(200).json(req.user);
  }

  static async logoutUser(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("token", { domain: "localhost", path: "/" });
    res.sendStatus(205);
  }
}

export default UserController;
