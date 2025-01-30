"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = exports.User = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Movie_1 = __importDefault(require("./Movie"));
exports.Movie = Movie_1.default;
User_1.default.hasMany(Movie_1.default, { as: "favorites", foreignKey: "usersId" });
Movie_1.default.hasMany(User_1.default, { as: "users", foreignKey: "moviesId" });
//# sourceMappingURL=index.js.map