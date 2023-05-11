"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
// import models from "./models/index.js";
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const corsOptions = {
    origin: ["http://localhost:3001"],
    //update: or "origin: true," if you don't wanna add a specific one
    credentials: true,
};
// Configuración del servidor
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rutas
app.use("/api", index_routes_1.default);
const PORT = process.env.PORT || 3001;
db_1.default.sync({ force: false }).then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`));
});
//# sourceMappingURL=server.js.map