import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';
import { readItem, readItems } from '$lib/utils/directus';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const vacation = await readItem('vacations', params.uuid);
		if (!vacation) redirect(302, '/vacations');

		const today = new Date().toISOString().split('T')[0];
		const sort = today <= vacation.end_date ? 'sort' : '-sort';

		const vacationDays = await readItems('vacation_days', {
			filter: {
				vacation: { _eq: vacation.id }
			},
			sort: [sort],
			fields: ['*.*']
		});

		return {
			title: vacation.title,
			vacation,
			vacationDays
		};
	} catch (error) {
		console.error(error);
		redirect(302, '/vacations');
	}
};
