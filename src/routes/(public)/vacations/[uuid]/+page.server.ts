import type { PageServerLoad, Actions } from './$types';

import { redirect } from '@sveltejs/kit';
import { readItem, readItems } from '$lib/utils/directus';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const vacation = await readItem('vacations', params.uuid);
		if (!vacation) redirect(302, '/vacations');

		const today = new Date().toISOString().split('T')[0];
		const sort = today <= vacation.end_date ? '-date' : 'date';

		const vacationDays = await readItems('vacation_days', {
			fields: ['*.*'],
			sort: [sort],
			filter: {
				vacation: { _eq: vacation.id }
			}
		});

		const comments = await readItems('comments', {
			fields: ['*.*'],
			sort: ['date_created'],
			filter: {
				related_items: {
					_some: {
						item: {
							_in: vacationDays.map((vd) => vd.id)
						}
					}
				}
			}
		});

		const reactions = await readItems('reactions', {
			fields: ['*.*'],
			sort: ['date_created'],
			filter: {
				related_items: {
					_some: {
						item: {
							_in: vacationDays.map((vd) => vd.id)
						}
					}
				}
			}
		});

		for (const day of vacationDays) {
			day.comments = comments.filter((c) => {
				const related_items = c.related_items.map((i: any) => i.item);
				return related_items.includes(day.id);
			});

			day.reactions = reactions.filter((r) => {
				const related_items = r.related_items.map((i: any) => i.item);
				return related_items.includes(day.id);
			});
		}

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

export const actions = {
	postComment: async ({ request, fetch }) => {
		const data = await request.formData();

		if (!data.get('text') || !data.get('vacation_day')) {
			return {
				success: false,
				toast: {
					type: 'warning',
					title: 'Fehler beim Speichern',
					description: 'Bitte gebe alle notwendigen Daten an.'
				}
			};
		}

		await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({
				author: data.get('author'),
				text: data.get('text'),
				related_items: [
					{
						collection: 'vacations_days',
						item: data.get('vacation_day')
					}
				]
			})
		});

		return {
			success: true,
			toast: {
				type: 'success',
				title: 'Kommentar gespeichert'
			}
		};
	}
} satisfies Actions;
