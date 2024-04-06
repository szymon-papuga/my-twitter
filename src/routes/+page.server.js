import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function load() {
    return {
        tweets: await prisma.tweet.findMany({
            include: {
                user: true
            }
        })
    }
}
