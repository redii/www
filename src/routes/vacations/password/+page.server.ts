import { redirect } from '@sveltejs/kit';
import { PRIVATE_VACATIONS_PASSWORD } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	return { hideBreadcrumbs: true };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		if (!data.get('password')) {
			return {
				success: false,
				notification: {
					type: 'warning',
					title: 'Fehler beim Login',
					description: 'Bitte ein Passwort eingeben'
				}
			};
		}

		if (data.get('password') === PRIVATE_VACATIONS_PASSWORD) {
			cookies.set('vacations_password', PRIVATE_VACATIONS_PASSWORD, {
				path: '/',
				maxAge: 60 * 60 * 24 * 30 // 30 days
			});
			throw redirect(302, '/vacations');
		} else {
			return {
				success: false,
				notification: {
					type: 'warning',
					title: 'Computer sagt nein 👀',
					description: 'Das angegebene Passwort ist falsch'
				}
			};
		}
	}
} satisfies Actions;
