import { Prisma } from "@prisma/client";
import { PrismaClient as MongoClient } from "../../prisma/generated/mongo_client";
import { PrismaClient as PostgresClient } from "../../prisma/generated/postgres_client";
import { DefaultArgs } from "@prisma/client/runtime/library";



export const DATA_SOURCE = process.env.DATA_SOURCE ?? "mongo"


type ClientMongo = MongoClient<Prisma.PrismaClientOptions, never, DefaultArgs>

type ClientPostgres = PostgresClient<Prisma.PrismaClientOptions, never, DefaultArgs>

export const mongoClient: ClientMongo = new MongoClient();
export const postgresClient: ClientPostgres = new PostgresClient();


export let prismaClient: any

if (DATA_SOURCE === "postgres") {
    prismaClient = postgresClient
} else {
    prismaClient = mongoClient
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