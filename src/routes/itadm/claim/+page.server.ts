import { fail, redirect } from '@sveltejs/kit';
import { claimDroplet } from '$lib/utils/digitalocean';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	return { hideBreadcrumbs: true };
};

export const actions = {
	claimDroplet: async ({ request, cookies }) => {
		try {
			if (cookies.get('droplet_claimCode')) return redirect(302, '/itadm');
			const data = await request.formData();
			const claimCode = data.get('claimCode') as string;

			const result = await claimDroplet(claimCode);

			if (result.success && result.droplet) {
				cookies.set('droplet_claimCode', result.droplet.claimCode, {
					path: '/',
					maxAge: 60 * 60 * 24 * 7 // 7 days
				});
			}

			return result;
		} catch (error) {
			console.error('Error in claimDroplet action:', error);
			return fail(500, {
				success: false,
				notification: {
					type: 'error',
					title: 'Fehler beim Zuweisen des Servers',
					description: 'Es ist ein unerwarteter Fehler aufgetreten.'
				} satisfies Notification
			});
		}
	},
	disconnectDroplet: async ({ cookies }) => {
		try {
			cookies.delete('droplet_claimCode', { path: '/' });

			return {
				success: true,
				notification: {
					type: 'info',
					title: 'Server wurde getrennt'
				}
			};
		} catch (error) {
			console.error('Error in disconnectDroplet action:', error);
			return fail(500, {
				success: false,
				notification: {
					type: 'error',
					title: 'Fehler beim Trennen des Servers',
					description: 'Es ist ein unerwarteter Fehler aufgetreten.'
				} satisfies Notification
			});
		}
	}
} satisfies Actions;
