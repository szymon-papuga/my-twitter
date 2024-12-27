import { readFileSync } from 'fs';
import { env } from '$env/dynamic/private';

let secret = null;

export default function jwtAccessSecret() {
	if (!secret) {
		secret = readFileSync(env.JWT_ACCESS_FILE, 'utf8');
	}

	return secret;
}
