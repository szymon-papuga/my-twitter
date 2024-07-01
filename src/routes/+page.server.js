import prisma from '$lib/prisma';

export async function load() {
	return {
		tweets: await prisma.tweet.findMany({
			include: {
				user: true
			},
			where: {
				parentTweet: null
			},
			take: 20,
			orderBy: {
				creationTime: 'desc'
			}
		})
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		await prisma.tweet.create({
			data: {
				text: data.get('text'),
				user: {
					connect: {
						id: 1
					}
				},
				creationTime: new Date(),
				parentTweet: {
					connect: {
						id: parseInt(data.get('parentId'))
					}
				}
			}
		});
	}
};
