import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const users = [
    {
        name: "John Doe"
    },
    {
        name: "Mary Doe"
    }
]

const date = new Date()
const date2 = new Date()
date2.setHours(date2.getHours() - 1)

const tweets = [
    {
        text: 'Lorem Ipsum',
        user: {
            connect: {
                id: 1
            }
        },
        creationTime: date
    },
    {
        text: 'some text',
        user: {
            connect: {
                id: 2
            }
        },
        creationTime: date2
    }
]

async function main() {
    console.log(`Start seeding...`)

    for (const u of users) {
        const user = await prisma.user.create({
            data: u
        })
        console.log(`Created user with id: ${user.id}`)
    }

    for (const t of tweets) {
        const tweet = await prisma.tweet.create({
            data: t,
            include: {
                user: true
            }
        })
        console.log(`Created tweet with id: ${tweet.id}`)
    }

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
