import prisma from '../src/lib/server/prisma';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function createTestUser() {
	const uuid = uuidv4();
	const email = `test_user_${uuid}@gmail.com`;
	await prisma.user.create({
		data: {
			name: `test user ${uuid}`,
			email,
			password: await bcrypt.hash('password', 10)
		}
	});

	return email;
}
