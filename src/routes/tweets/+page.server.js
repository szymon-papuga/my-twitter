import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import redirectIfNotLoggedIn from '$lib/server/redirect.js';

export async function load(event) {
	redirectIfNotLoggedIn(event);

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
	comment: async ({ request, locals }) => {
		const data = await request.formData();
		await prisma.tweet.create({
			data: {
				text: data.get('text'),
				user: {
					connect: {
						id: locals.user.id
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
	},
	logout: async ({ cookies }) => {
		cookies.delete('AuthorizationToken', { path: '/' });
		throw redirect(302, '/login');
	}
};
