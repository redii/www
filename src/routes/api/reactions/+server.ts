import { json } from '@sveltejs/kit';
import { createItem } from '$lib/utils/directus';

import type { Reaction } from '$lib/types';

export async function POST({ request }) {
	const data = (await request.json()) satisfies Reaction;
	const reaction = await createItem('reactions', data);
	return json(reaction);
}
