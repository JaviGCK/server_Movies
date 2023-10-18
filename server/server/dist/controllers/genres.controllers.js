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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenre = exports.getAllGenres = exports.createGenres = void 0;
const clientPrisma_1 = require("../db/clientPrisma");
const utils_1 = require("../helpers/utils");
const createGenres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = req.body;
    const { moviesId } = req.params;
    try {
        const movie = yield clientPrisma_1.prismaClient.movie.findUnique({
            where: {
                id: (0, utils_1.converToType)(moviesId)
            },
            include: {
                genres: true
            }
        });
        if (((_a = movie === null || movie === void 0 ? void 0 : movie.genres) === null || _a === void 0 ? void 0 : _a.length) < 3) {
            const newGenre = yield clientPrisma_1.prismaClient.genre.create({
                data: {
                    name,
                    Movie: {
                        connect: {
                            id: (0, utils_1.converToType)(moviesId)
                        }
                    }
                }
            });
            return res.status(200).send(newGenre);
        }
        else {
            return res.status(400).send("Only 3 genres per movie");
        }
    }
    catch (error) {
        console.error('Error creating genre:', error);
        return res.status(500).send("Internal Server Error");
    }
});
exports.createGenres = createGenres;
const getAllGenres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGenres = yield clientPrisma_1.prismaClient.genre.findMany();
        res.status(200).send(allGenres);
    }
    catch (error) {
        console.error('Error fetching all genres:', error);
        return res.status(500).send("Internal Server Error");
    }
});
exports.getAllGenres = getAllGenres;
const deleteGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genresId } = req.params;
    try {
        yield clientPrisma_1.prismaClient.genre.delete({
            where: {
                id: (0, utils_1.converToType)(genresId)
            }
        });
        res.status(200).send('Genre has been deleted');
    }
    catch (error) {
        console.error('Error deleting genre:', error);
        return res.status(500).send("Internal Server Error");
    }
});
exports.deleteGenre = deleteGenre;
