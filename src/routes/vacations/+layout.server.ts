import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

import { PRIVATE_VACATIONS_PASSWORD } from '$env/static/private';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
	const password = url.searchParams.get('password');
	if (password === PRIVATE_VACATIONS_PASSWORD) {
		cookies.set('vacations_password', password, { path: '/' });
		return;
	}

	if (
		cookies.get('vacations_password') !== PRIVATE_VACATIONS_PASSWORD &&
		url.pathname !== '/vacations/password'
	) {
		throw redirect(302, '/vacations/password');
	}
};
