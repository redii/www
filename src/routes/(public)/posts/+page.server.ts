import { readItems } from '$lib/utils/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const pageList = await readItems('posts', {
		filter: import.meta.env.DEV
			? { status: { _neq: 'archived' } }
			: { status: { _eq: 'published' } },
		sort: ['-date']
	});

	return { pageList };
};
