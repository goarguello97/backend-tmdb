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
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;
class MoviesService {
    static getSpecificService(search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield axios_1.default.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}&language=es-ES&page=1`);
                const tvSeries = yield axios_1.default.get(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${search}&language=es-ES&page=1`);
                return {
                    error: false,
                    data: { movies: movies.data, tvSeries: tvSeries.data },
                };
            }
            catch ({ response }) {
                const error = response.data;
                return { error: true, data: error };
            }
        });
    }
    static getPopularService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Peliculas populares
                const movies = axios_1.default.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`);
                const tvSeries = axios_1.default.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES&page=1`);
                const [moviesResult, tvSeriesResult] = yield Promise.all([
                    movies,
                    tvSeries,
                ]);
                return {
                    error: false,
                    data: {
                        movies: moviesResult.data.results,
                        tvSeries: tvSeriesResult.data.results,
                    },
                };
            }
            catch (error) {
                return { error: true, data: error };
            }
        });
    }
    static getComedyService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Peliculas comedia
                const moviesComedy = yield axios_1.default.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&language=es-ES`);
                return {
                    error: false,
                    data: moviesComedy.data.results,
                };
            }
            catch (error) {
                return { error: true, data: error };
            }
        });
    }
    static getHorrorService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Peliculas terror
                const moviesHorror = yield axios_1.default.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&language=es-ES`);
                return { error: false, data: moviesHorror.data.results };
            }
            catch (error) {
                return { error: true, data: error };
            }
        });
    }
    static getDramaService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Peliculas drama
                const moviesDrama = axios_1.default.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=18&language=es-ES`);
                return { error: false, data: (yield moviesDrama).data.results };
            }
            catch (error) {
                return { error: true, data: error };
            }
        });
    }
    static getOneService(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (category === "movie") {
                    const resp = yield axios_1.default.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images&language=es-ES`);
                    return { error: false, data: resp.data };
                }
                else if (category === "tv") {
                    const resp = yield axios_1.default.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images&language=es-ES`);
                    return { error: false, data: resp.data };
                }
            }
            catch ({ response }) {
                const error = response.data;
                return { error: true, data: error };
            }
        });
    }
}
exports.default = MoviesService;
//# sourceMappingURL=movie.services.js.map