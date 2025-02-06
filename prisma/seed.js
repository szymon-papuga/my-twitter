import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const tweets = [
	{
		text: 'This tweet is meant to be located by Playwright test',
		user: {
			create: {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			}
		},
		creationTime: new Date()
	},
	...Array.from({ length: 50 }).map(() => ({
		text: faker.lorem.words({ min: 1, max: 100 }).substring(0, 140),
		user: {
			create: {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			}
		},
		creationTime: faker.date.recent()
	}))
];

async function main() {
	const tweetCount = await prisma.tweet.count();

	if (tweetCount >= 50) {
		console.log('Skiping seeding as there are over 50 tweets in DB');
		return;
	}

	console.log(`Start seeding...`);

	console.log('Creating test user');

	await prisma.user.create({
		data: {
			name: 'test user',
			email: 'test_user@gmail.com',
			password: await bcrypt.hash('password', 10)
		}
	});

	for (const t of tweets) {
		const tweet = await prisma.tweet.create({
			data: t
		});
		console.log(`Created tweet with id: ${tweet.id}`);
	}

	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
