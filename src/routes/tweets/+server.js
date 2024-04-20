import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma'

export async function GET() {
    const tweets = await prisma.tweet.findMany({
        include: {
            user: true
        },
    })

    return json(tweets);
}

