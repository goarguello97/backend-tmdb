"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const index_1 = require("../schemas/index");
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const { getUsers, getUser, getUserWithId, registerUser, loginUser, secret, logoutUser, updateUser, deleteUser, } = user_controllers_1.default;
const index_2 = require("../middlewares/index");
router.get("/", getUsers);
router.get("/user", getUser);
router.get("/user/:id", getUserWithId);
router.post("/", (0, express_validator_1.checkSchema)(index_1.user), index_2.validateFields, registerUser);
router.post("/login", (0, express_validator_1.checkSchema)(index_1.login), index_2.validateFields, loginUser);
router.get("/secret", index_2.validateAuth, secret);
router.post("/logout", index_2.validateAuth, logoutUser);
router.put("/", (0, express_validator_1.checkSchema)(index_1.update), index_2.validateFields, updateUser);
router.delete("/", (0, express_validator_1.checkSchema)(index_1.del), index_2.validateFields, deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map