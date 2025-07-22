import { signOut } from '../../../../auth';
import type { Actions, PageServerLoad } from './$types';

export const actions: Actions = { default: signOut };

export const load: PageServerLoad = async ({ cookies }) => {
	cookies.set('authjs.session-token', '', {
		path: '/',
		expires: new Date(0)
	});

	return {
		hideBreadcrumbs: true
	};
};
