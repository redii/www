import { fail } from '@sveltejs/kit';
import { getDropletsByTag, deleteDropletsByTag } from '$lib/utils/digitalocean';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const response = await getDropletsByTag('itadm');
		return {
			servers: response.droplets
		};
	} catch (error) {
		console.error(error);
	}
};

export const actions = {
	deleteDroplets: async () => {
		try {
			await deleteDropletsByTag('itadm');

			return {
				success: true,
				toast: {
					type: 'success',
					title: 'Server gelöscht',
					description: 'Alle ITADM Server wurden erfolgreich gelöscht.'
				} satisfies Toast
			};
		} catch (error) {
			console.error('Error in deleteDroplets action:', error);
			return fail(500, {
				success: false,
				toast: {
					type: 'error',
					title: 'Fehler beim Löschen der Server',
					description: 'Es ist ein unerwarteter Fehler aufgetreten.'
				} satisfies Toast
			});
		}
	}
} satisfies Actions;
