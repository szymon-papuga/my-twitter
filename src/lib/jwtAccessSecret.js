import { readFileSync } from 'fs';

let secret = null;

export default function jwtAccessSecret() {
	if (!secret) {
		secret = readFileSync('/run/secrets/jwt-access', 'utf8');
	}

	return secret;
}
