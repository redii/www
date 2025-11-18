import { fail } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import { readItems } from '$lib/utils/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;

	const pageList = await readItems('posts', {
		filter: {
			slug: { _eq: slug }
		}
	});
	if (!pageList.length) return fail(404, 'Post not found');
	const post = pageList[0];
	const html = await compile(post.text);

	return {
		post,
		html
	};
};
