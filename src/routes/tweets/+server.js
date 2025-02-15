import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export async function GET({ url }) {
	const tweets = await prisma.tweet.findMany({
		include: {
			user: true
		},
		where: {
			parentTweet: null
		},
		take: 20,
		skip: 1,
		cursor: {
			id: Number(url.searchParams.get('cursor'))
		},
		orderBy: {
			creationTime: 'desc'
		}
	});

	return json(tweets);
}

export async function POST({ request }) {
	const tweet = await request.json();
}
