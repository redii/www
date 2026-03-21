import { fail } from '@sveltejs/kit';
import { getItadmDroplets, deleteDropletsByTag } from '$lib/utils/digitalocean';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const servers = await getItadmDroplets();
		return { servers };
	} catch (error) {
		console.error(error);
		return { servers: [] };
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
