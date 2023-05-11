"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Movie extends sequelize_1.Model {
}
Movie.init({
    movieId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    movieTitle: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    movieDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    movieGenre: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON),
        allowNull: false,
    },
    typeFilm: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: "movie",
});
exports.default = Movie;
//# sourceMappingURL=Movie.js.map