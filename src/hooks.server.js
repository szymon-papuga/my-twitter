import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '$env/static/private';
import prisma from '$lib/prisma';

export async function handle({ event, resolve }) {
	const authCookie = event.cookies.get('AuthorizationToken');

	if (authCookie) {
		const token = authCookie.split(' ')[1];

		try {
			const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);

			const user = await prisma.user.findUnique({
				where: {
					id: jwtUser.id
				}
			});

			if (!user) {
				throw new Error('User not found');
			}

			event.locals.user = {
				id: user.id,
				email: user.email
			};
		} catch (error) {
			console.error(error);
		}
	}

	return await resolve(event);
}
