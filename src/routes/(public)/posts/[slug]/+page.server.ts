import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';
import type { Post } from '$lib/types';

export async function load({ params }) {
	const posts = import.meta.glob(`/src/posts/*.md`);
	if (!posts) throw error(404, 'Posts not found');

	const match = Object.entries(posts).find(([path]) => path.endsWith(`${params.slug}.md`));
	if (!match) throw error(404, 'Matching post not found');

	const post = await match[1]();
	if (!post) throw error(500, 'Error parsing post');

	const metadata: Post = { ...post.metadata, slug: params.slug } satisfies Post;
	const html = render(post.default, { props: {} }).body;

	return {
		meta: metadata,
		content: html
	};
}
