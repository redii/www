import { fail } from '@sveltejs/kit';
import { claimDroplet } from '$lib/utils/digitalocean';
import { Mutex } from 'async-mutex';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	return { hideBreadcrumbs: true };
};

export const actions = {
	claimDroplet: async ({ request, cookies }) => {
		try {
			const data = await request.formData();
			const claimCode = data.get('claimCode') as string;

			// create resourceLock to prevent droplets to be tagged multiple times
			const resourceLock = new Mutex();
			const release = await resourceLock.acquire();

			const result = await claimDroplet(claimCode);
			if (result.success && result.droplet) {
				cookies.set('droplet_claimCode', result.droplet.claimCode, {
					path: '/',
					maxAge: 60 * 60 * 24 * 14 // 14 days
				});
			}

			// release resourceLock
			release();

			return result;
		} catch (error) {
			console.error('Error in claimDroplet action:', error);
			return fail(500, {
				success: false,
				toast: {
					type: 'error',
					title: 'Fehler beim Zuweisen des Servers',
					description: 'Es ist ein unerwarteter Fehler aufgetreten.'
				} satisfies Toast
			});
		}
	},
	disconnectDroplet: async ({ cookies }) => {
		try {
			cookies.delete('droplet_claimCode', { path: '/' });

			return {
				success: true,
				toast: {
					type: 'info',
					title: 'Server wurde getrennt'
				}
			};
		} catch (error) {
			console.error('Error in disconnectDroplet action:', error);
			return fail(500, {
				success: false,
				toast: {
					type: 'error',
					title: 'Fehler beim Trennen des Servers',
					description: 'Es ist ein unerwarteter Fehler aufgetreten.'
				} satisfies Toast
			});
		}
	}
} satisfies Actions;
