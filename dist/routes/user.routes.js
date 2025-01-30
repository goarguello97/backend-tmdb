"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const index_1 = require("../middlewares/index");
const index_2 = require("../schemas/index");
const router = express_1.default.Router();
const { getUsers, getUser, getUserWithId, registerUser, loginUser, secret, updateUser, deleteUser, } = user_controllers_1.default;
router.get("/", getUsers);
router.get("/user", getUser);
router.get("/user/:id", getUserWithId);
router.post("/", (0, express_validator_1.checkSchema)(index_2.user), index_1.validateFields, registerUser);
router.post("/login", (0, express_validator_1.checkSchema)(index_2.login), index_1.validateFields, loginUser);
router.get("/secret/:token", index_1.validateAuth, secret);
router.put("/", (0, express_validator_1.checkSchema)(index_2.update), index_1.validateFields, updateUser);
router.delete("/", (0, express_validator_1.checkSchema)(index_2.del), index_1.validateFields, deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map