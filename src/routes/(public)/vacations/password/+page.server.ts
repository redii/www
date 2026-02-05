import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const vacationUuid = url.searchParams.get('v');

	return {
		vacationUuid,
		hideBreadcrumbs: true
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		if (!data.get('password')) {
			return {
				success: false,
				toast: {
					type: 'warning',
					title: 'Fehler beim Login',
					description: 'Bitte ein Passwort eingeben'
				}
			};
		}

		if (data.get('password') === env.PRIVATE_VACATIONS_PASSWORD) {
			cookies.set('vacations_password', env.PRIVATE_VACATIONS_PASSWORD, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365 // 365 days
			});
			throw redirect(302, `/vacations/${data.get('vacationUuid') || ''}`);
		} else {
			return {
				success: false,
				toast: {
					type: 'warning',
					title: 'Computer sagt nein 👀',
					description: 'Das angegebene Passwort ist falsch'
				}
			};
		}
	}
} satisfies Actions;
