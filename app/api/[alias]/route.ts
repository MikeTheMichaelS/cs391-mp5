import getCollection, { COLLECTION_NAME } from "@/db";
import aliasUrl from "@/types";
import { NextRequest } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ alias: string }> }
) {
    const { alias } = await params;
    const collection = await getCollection(COLLECTION_NAME);
    const url = await collection.findOne({ alias: alias });

    if (!url) {
        return new Response(
            JSON.stringify(
                {
                    occupied: false,
                    alias: alias
                }
            )
        );
    }

    return new Response(
        JSON.stringify(
            {
                occupied: true,
                alias: alias
            }
        )
    );
}

export async function POST(request: NextRequest) {
    const body = await request.json() as aliasUrl;
    console.log(body);
    const { longUrl, alias } = body;
    const collection = await getCollection(COLLECTION_NAME);
    const url = await collection.findOne({ alias: alias });

    if (url) {
        return new Response(
            JSON.stringify(
                {
                    success: false,
                    occupied: true,
                    alias: alias
                }
            )
        );
    }

    await collection.insertOne({ longUrl, alias });

    return new Response(
        JSON.stringify(
            {
                success: true,
                occupied: false,
                alias: alias,
                longUrl: longUrl
            }
        )
    );
}