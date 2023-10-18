import { Request, Response } from 'express';
import { prismaClient } from '../db/clientPrisma';
import { converToType } from '../helpers/utils';

export const createUsers = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
        const newUser = await prismaClient.user.create({
            data: {
                name,
                email,
            },
        });

        res.status(201).send(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
};

export const getAllUsers = async (_: Request, res: Response) => {
    try {
        const allUsers = await prismaClient.user.findMany();
        res.status(200).send(allUsers);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await prismaClient.user.findUnique({
            where: {
                id: converToType(userId),
            },
            include: {
                movies: {
                    select: {
                        id: true,
                        name: true,
                        url: true,
                        score: true,
                        description: true,
                        genres: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    try {
        const updatedUser = await prismaClient.user.update({
            where: {
                id: converToType(userId),
            },
            data: {
                name,
                email,
                password,
            },
        });
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
};

export const removeUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        await prismaClient.user.delete({
            where: {
                id: converToType(userId),
            },
        });
        res.status(204).send('User has been deleted');
    } catch (error) {
        console.error('Error removing user by ID:', error);
        res.status(500).send('Internal Server Error');
    }
};
