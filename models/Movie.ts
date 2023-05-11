import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Movie extends Model {}

Movie.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    movieTitle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    movieDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    movieGenre: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    typeFilm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "movie",
  }
);

export default Movie;
