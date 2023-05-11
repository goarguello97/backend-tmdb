import User from "./User";
import Movie from "./Movie";

User.hasMany(Movie, { as: "favorites", foreignKey: "usersId" });
Movie.hasMany(User, { as: "users", foreignKey: "moviesId" });

export { User, Movie };
