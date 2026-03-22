import { json, type RequestHandler } from '@sveltejs/kit';
import { createItem } from '$lib/utils/directus';

import type { Reaction } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
	const data = (await request.json()) satisfies Reaction;
	const reaction = await createItem('reactions', data);
	return json(reaction);
};
