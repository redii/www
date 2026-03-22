import { json, type RequestHandler } from '@sveltejs/kit';
import { createItem } from '$lib/utils/directus';

import type { Comment } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
	const data = (await request.json()) satisfies Comment;
	const comment = await createItem('comments', data);
	return json(comment);
};
