import { redirect } from '@sveltejs/kit';

export default function redirectIfNotLoggedIn(event) {
	const user = event.locals.user;

	if (!user) {
		redirect(302, '/login');
	}
}
