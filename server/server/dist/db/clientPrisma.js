"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = exports.postgresClient = exports.mongoClient = exports.DATA_SOURCE = void 0;
const mongo_client_1 = require("../../prisma/generated/mongo_client");
const postgres_client_1 = require("../../prisma/generated/postgres_client");
exports.DATA_SOURCE = (_a = process.env.DATA_SOURCE) !== null && _a !== void 0 ? _a : "mongo";
exports.mongoClient = new mongo_client_1.PrismaClient();
exports.postgresClient = new postgres_client_1.PrismaClient();
if (exports.DATA_SOURCE === "postgres") {
    exports.prismaClient = exports.postgresClient;
}
else {
    exports.prismaClient = exports.mongoClient;
}
/**
 * type ClientType = {
    [key: string]: MongoClient | PostgresClient;
};

export const mongoClient = new MongoClient();
export const postgresClient = new PostgresClient();

const clients: ClientType = {
    mongo: mongoClient,
    postgres: postgresClient,
};

export default clients[DATA_SOURCE as keyof ClientType];
 */ 
