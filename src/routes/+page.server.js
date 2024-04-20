import prisma from '$lib/prisma'

export async function load() {
    return {
        tweets: await prisma.tweet.findMany({
            include: {
                user: true
            },
            take: 20,
            orderBy: {
                creationTime: 'desc',
            }
        })
    }
}
