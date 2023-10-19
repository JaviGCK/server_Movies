import { PrismaClient } from "@prisma/client";


export const prismaClient = new PrismaClient()



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