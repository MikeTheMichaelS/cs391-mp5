import getCollection, { COLLECTION_NAME } from '@/db';
import aliasUrl from '@/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { alias: string } }) {
    const alias = (await params).alias;
    const collection = await getCollection(COLLECTION_NAME);
    const data = await collection.findOne({ alias: alias });
    const url = data as aliasUrl | null;
    if (!url) {
        return NextResponse.redirect(new URL(`/error/${alias}`, process.env.NEXT_PUBLIC_BASE_URL as string));
    } else {
        return NextResponse.redirect(url.longUrl);
    }
}