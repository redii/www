import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();

	if (!session?.user?.email) {
		throw redirect(302, '/login');
	}

	return {
		session
	};
};
