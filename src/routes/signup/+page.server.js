import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

export const actions = {
	default: async ({ request }) => {
		const user = Object.fromEntries(await request.formData());

		const missingFields = ['username', 'email', 'password'].filter((field) => !user[field]);

		if (!_.isEmpty(missingFields)) {
			return fail(400, { user, error: `Missing ${missingFields.join(' and ')}` });
		}

		const userAlreadySignedUp =
			(await prisma.user.findUnique({
				where: {
					email: user.email
				}
			})) !== null;

		if (userAlreadySignedUp) {
			return fail(409, {
				user,
				error: 'The account for the given e-mail already exists. Use different e-mail.'
			});
		}

		await prisma.user.create({
			data: {
				name: user.username,
				email: user.email,
				password: await bcrypt.hash(user.password, 10)
			}
		});

		throw redirect(302, '/login');
	}
};
