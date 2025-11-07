import { readItems } from '$lib/utils/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const vacations = await readItems('vacations', {
			fields: ['title', 'image'],
			sort: ['-start_date'],
			limit: 5
		});
		return { vacations };
	} catch (error) {
		console.error(error);
		return { vacations: [] };
	}
};
