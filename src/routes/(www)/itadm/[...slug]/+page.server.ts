import { error } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import { readItems, readItem } from '$lib/utils/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug ? params.slug.split('/').pop() : '/';

	const pageList = await readItems('itadm_content', {
		filter: {
			slug: { _eq: slug }
		},
		fields: ['*', 'childs.*']
	});
	if (!pageList.length) throw error(404, 'Content not found');
	const page = pageList[0];

	let path = page.slug === '/' ? [] : [page.slug];
	let hasParent = Boolean(page.parent);
	let tmpPage = page;
	while (hasParent) {
		const p = await readItem('itadm_content', tmpPage.parent);
		if (p.slug !== '/') path.unshift(p.slug);
		if (!p.parent) break;
		tmpPage = p;
	}

	const html = await compile(page.text);

	return {
		path,
		page,
		html
	};
};
