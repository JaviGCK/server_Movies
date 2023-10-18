import { Request, Response } from "express";
import { prismaClient } from "../db/clientPrisma";
import { converToType } from '../helpers/utils';
import { uploadImage } from '../helpers/cloudinary';

export const createMovie = async (req: Request, res: Response) => {
    const { name, score, description } = req.body;
    const { userId } = req.params;
    const urlFile = (req.files as any)?.url;

    try {
        if (urlFile) {
            const upload = await uploadImage(urlFile.tempFilePath);
            const newMovie = await prismaClient.movie.create({
                data: {
                    name,
                    url: upload.secure_url,
                    score: parseInt(score),
                    description: description,
                    User: {
                        connect: {
                            id: converToType(userId)
                        }
                    }
                }
            });

            // Agregar un console.log para verificar que se haya creado la película
            console.log('New Movie:', newMovie);

            res.status(201).json({ message: "Movie created successfully" });
        } else {
            res.status(404).send('No user found');
        }
    } catch (error) {
        // Agregar un console.log para capturar el error
        console.error("Error creating movie:", error);
        res.status(500).json({ error: "An error occurred while creating the movie." });
    }
}

export const getAllMovies = async (_: Request, res: Response) => {
    try {
        const movies = await prismaClient.movie.findMany();
        res.status(200).send(movies);
    } catch (error) {
        console.error('Error fetching all movies:', error);
        res.status(500).send("Internal Server Error");
    }
}

export const getMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const movie = await prismaClient.movie.findUnique({
            where: {
                id: converToType(movieId)
            },
            include: {
                genres: true
            }
        });

        if (movie) {
            res.status(200).send(movie);
        } else {
            res.status(404).json({ error: "Movie not found" });
        }
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        res.status(500).send("Internal Server Error");
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { name, score, description } = req.body;
    const urlFile = (req.files as any)?.url;

    try {
        if (urlFile) {
            const upload = await uploadImage(urlFile.tempFilePath);
            const updatedMovie = await prismaClient.movie.update({
                where: {
                    id: converToType(movieId)
                },
                data: {
                    name,
                    url: upload.secure_url,
                    score: converToType(score),
                    description: description
                }
            });
            res.status(200).json({ message: "Movie updated successfully" });
        } else {
            res.status(404).json({ error: "No movie found" });
        }
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).json({ error: "An error occurred while updating the movie." });
    }
}

export const removeMovies = async (_: Request, res: Response) => {
    try {
        await prismaClient.movie.deleteMany();
        res.status(204).send('All movies have been deleted');
    } catch (error) {
        console.error('Error removing all movies:', error);
        res.status(500).send("Internal Server Error");
    }
}

export const removeMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        await prismaClient.movie.delete({
            where: {
                id: converToType(movieId)
            }
        });
        res.status(204).send('Movie has been deleted');
    } catch (error) {
        console.error('Error removing movie by ID:', error);
        res.status(500).send("Internal Server Error");
    }
}
