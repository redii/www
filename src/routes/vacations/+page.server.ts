import { readItems } from '$lib/utils/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const vacations = await readItems('vacations');
		return { vacations };
	} catch (error) {
		console.error(error);
		return { vacations: [] };
	}
};
