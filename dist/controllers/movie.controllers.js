"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie_services_1 = __importDefault(require("../services/movie.services"));
const { getSpecificService, getPopularService, getComedyService, getHorrorService, getDramaService, getOneService, } = movie_services_1.default;
class MoviesController {
    static getSpecific(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search } = req.body;
            const { error, data } = yield getSpecificService(search);
            if (error) {
                return res.status(500).json({ message: data.status_message });
            }
            res.status(200).json(data);
        });
    }
    static getPopular(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, data } = yield getPopularService();
            if (error) {
                return res.status(500).json({ message: data.status_message });
            }
            res.status(200).send(data);
        });
    }
    static getComedy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, data } = yield getComedyService();
            if (error) {
                return res.status(500).json({ message: data.status_message });
            }
            res.status(200).send(data);
        });
    }
    static getHorror(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, data } = yield getHorrorService();
            if (error) {
                return res.status(500).json({ message: data.status_message });
            }
            res.status(200).send(data);
        });
    }
    static getDrama(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, data } = yield getDramaService();
            if (error) {
                return res.status(500).json({ message: data.status_message });
            }
            res.status(200).send(data);
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, typeFilm } = req.params;
            const { error, data } = yield getOneService(id, typeFilm);
            if (error) {
                return res.status(500).json({ message: data.status_message });
            }
            res.status(200).json(data);
        });
    }
}
exports.default = MoviesController;
//# sourceMappingURL=movie.controllers.js.map