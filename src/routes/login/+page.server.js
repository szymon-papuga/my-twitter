import { redirect, fail } from '@sveltejs/kit';
import _ from 'lodash';
import prisma from '$lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwtAccessSecret from '$lib/jwtAccessSecret';

export function load(event) {
	if (event.locals.user) {
		throw redirect(302, '/tweets');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());

		const missingFields = ['email', 'password'].filter((field) => !formData[field]);

		if (!_.isEmpty(missingFields)) {
			return fail(400, { error: `Missing ${missingFields.join(' and ')}` });
		}

		const user = await prisma.user.findUnique({
			where: {
				email: formData.email
			}
		});

		if (!user) {
			return fail(401, { error: 'Invalid credentials' });
		}

		const passwordIsValid = await bcrypt.compare(formData.password, user.password);

		if (!passwordIsValid) {
			return fail(401, { error: 'Invalid credentials' });
		}

		const jwtUser = {
			id: user.id,
			email: user.email
		};

		const token = jwt.sign(jwtUser, jwtAccessSecret(), { expiresIn: '1d' });

		cookies.set('AuthorizationToken', `Bearer ${token}`, {
			path: '/',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		throw redirect(302, '/tweets');
	}
};
