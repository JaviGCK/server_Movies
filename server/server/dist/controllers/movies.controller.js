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
exports.removeMovieById = exports.removeMovies = exports.updateMovie = exports.getMovieById = exports.getAllMovies = exports.createMovie = void 0;
const clientPrisma_1 = require("../db/clientPrisma");
const utils_1 = require("../helpers/utils");
const cloudinary_1 = require("../helpers/cloudinary");
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, score, description } = req.body;
    const { userId } = req.params;
    const urlFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.url;
    try {
        if (urlFile) {
            const upload = yield (0, cloudinary_1.uploadImage)(urlFile.tempFilePath);
            const newMovie = yield clientPrisma_1.prismaClient.movie.create({
                data: {
                    name,
                    url: upload.secure_url,
                    score: parseInt(score),
                    description: description,
                    User: {
                        connect: {
                            id: (0, utils_1.converToType)(userId)
                        }
                    }
                }
            });
            // Agregar un console.log para verificar que se haya creado la película
            console.log('New Movie:', newMovie);
            res.status(201).json({ message: "Movie created successfully" });
        }
        else {
            res.status(404).send('No user found');
        }
    }
    catch (error) {
        // Agregar un console.log para capturar el error
        console.error("Error creating movie:", error);
        res.status(500).json({ error: "An error occurred while creating the movie." });
    }
});
exports.createMovie = createMovie;
const getAllMovies = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield clientPrisma_1.prismaClient.movie.findMany();
        res.status(200).send(movies);
    }
    catch (error) {
        console.error('Error fetching all movies:', error);
        res.status(500).send("Internal Server Error");
    }
});
exports.getAllMovies = getAllMovies;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    try {
        const movie = yield clientPrisma_1.prismaClient.movie.findUnique({
            where: {
                id: (0, utils_1.converToType)(movieId)
            },
            include: {
                genres: true
            }
        });
        if (movie) {
            res.status(200).send(movie);
        }
        else {
            res.status(404).json({ error: "Movie not found" });
        }
    }
    catch (error) {
        console.error('Error fetching movie by ID:', error);
        res.status(500).send("Internal Server Error");
    }
});
exports.getMovieById = getMovieById;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { movieId } = req.params;
    const { name, score, description } = req.body;
    const urlFile = (_b = req.files) === null || _b === void 0 ? void 0 : _b.url;
    try {
        if (urlFile) {
            const upload = yield (0, cloudinary_1.uploadImage)(urlFile.tempFilePath);
            const updatedMovie = yield clientPrisma_1.prismaClient.movie.update({
                where: {
                    id: (0, utils_1.converToType)(movieId)
                },
                data: {
                    name,
                    url: upload.secure_url,
                    score: (0, utils_1.converToType)(score),
                    description: description
                }
            });
            res.status(200).json({ message: "Movie updated successfully" });
        }
        else {
            res.status(404).json({ error: "No movie found" });
        }
    }
    catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).json({ error: "An error occurred while updating the movie." });
    }
});
exports.updateMovie = updateMovie;
const removeMovies = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield clientPrisma_1.prismaClient.movie.deleteMany();
        res.status(204).send('All movies have been deleted');
    }
    catch (error) {
        console.error('Error removing all movies:', error);
        res.status(500).send("Internal Server Error");
    }
});
exports.removeMovies = removeMovies;
const removeMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    try {
        yield clientPrisma_1.prismaClient.movie.delete({
            where: {
                id: (0, utils_1.converToType)(movieId)
            }
        });
        res.status(204).send('Movie has been deleted');
    }
    catch (error) {
        console.error('Error removing movie by ID:', error);
        res.status(500).send("Internal Server Error");
    }
});
exports.removeMovieById = removeMovieById;
