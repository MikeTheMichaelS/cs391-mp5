import { MongoClient, Db, Collection } from "mongodb";
import { NextResponse } from "next/server";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}
const DB_NAME = "cs-391-uri-shortener";
export const COLLECTION_NAME = "urls";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

export default async function getCollection(
    collectionName: string
): Promise<Collection> {
    if (!db) {
        db = await connect();
    }
    return db.collection(collectionName);
}
