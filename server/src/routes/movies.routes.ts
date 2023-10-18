import { Router } from 'express'
import { createMovie, getAllMovies, getMovieById, removeMovies, removeMovieById, updateMovie } from "../controllers/movies.controller"

export const moviesRoutes = Router()

moviesRoutes
    .post('/:userId', createMovie)
    .get('/', getAllMovies)
    .get('/:movieId', getMovieById)
    .put('/:movieId', updateMovie)
    .delete('/', removeMovies)
    .delete('/:movieId', removeMovieById);
