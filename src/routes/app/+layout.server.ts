import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

import { PRIVATE_AUTH_ADMIN_EMAIL } from '$env/static/private';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();

	if (!session?.user?.email) {
		throw redirect(302, '/login');
	}

	if (event.url.pathname !== '/app/hello' && session.user.email !== PRIVATE_AUTH_ADMIN_EMAIL) {
		throw redirect(302, '/app/hello');
	}

	return { session };
};
