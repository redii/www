import { getDropletsByTag } from '$lib/utils/digitalocean';
import type { PageServerLoad } from './$types';

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
