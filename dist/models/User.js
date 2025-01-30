"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../config/db"));
const salt = bcrypt_1.default.genSaltSync(10);
class User extends sequelize_1.Model {
    hash(password, salt) {
        return bcrypt_1.default.hashSync(password, salt);
    }
    validatePassword(entryPass) {
        return bcrypt_1.default.compareSync(entryPass, this.password);
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: "user",
});
User.beforeCreate((user) => {
    const hash = user.hash(user.password, salt);
    return (user.password = hash);
});
exports.default = User;
//# sourceMappingURL=User.js.map