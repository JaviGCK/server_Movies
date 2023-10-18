import { Router } from 'express'
import { createGenres, deleteGenre, getAllGenres } from '../controllers/genres.controllers'
export const genresRoutes = Router()

genresRoutes

    .post('/:moviesId', createGenres)

    .get('/', getAllGenres)

    .delete('/:genresId', deleteGenre)