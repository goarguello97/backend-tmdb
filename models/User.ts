import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/db";

const salt = bcrypt.genSaltSync(10);

class User extends Model {
  [x: string]: any;
  password: string;
  email: string;
  name: string;
  lastname: string;

  hash(password: string, salt: string) {
    return bcrypt.hashSync(password, salt);
  }

  validatePassword(entryPass: string) {
    return bcrypt.compareSync(entryPass, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

User.beforeCreate((user: any) => {
  const hash = user.hash(user.password, salt);
  return (user.password = hash);
});

export default User;
