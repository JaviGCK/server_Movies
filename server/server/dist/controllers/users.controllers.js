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
exports.removeUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUsers = void 0;
const clientPrisma_1 = require("../db/clientPrisma");
const utils_1 = require("../helpers/utils");
const createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const newUser = yield clientPrisma_1.prismaClient.user.create({
            data: {
                name,
                email,
            },
        });
        res.status(201).send(newUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
});
exports.createUsers = createUsers;
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield clientPrisma_1.prismaClient.user.findMany();
        res.status(200).send(allUsers);
    }
    catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield clientPrisma_1.prismaClient.user.findUnique({
            where: {
                id: (0, utils_1.converToType)(userId),
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
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    try {
        const updatedUser = yield clientPrisma_1.prismaClient.user.update({
            where: {
                id: (0, utils_1.converToType)(userId),
            },
            data: {
                name,
                email,
                password,
            },
        });
        res.status(200).send(updatedUser);
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
});
exports.updateUser = updateUser;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        yield clientPrisma_1.prismaClient.user.delete({
            where: {
                id: (0, utils_1.converToType)(userId),
            },
        });
        res.status(204).send('User has been deleted');
    }
    catch (error) {
        console.error('Error removing user by ID:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.removeUser = removeUser;
