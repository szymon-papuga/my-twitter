import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

export const actions = {
	default: async ({ request }) => {
		const user = Object.fromEntries(await request.formData());

		const missingFields = ['username', 'email', 'password'].filter((field) => !user[field]);

		if (!_.isEmpty(missingFields)) {
			return fail(400, {
				error: `Missing ${missingFields.join(' and ')}`
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
