import { fail } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import { readItems } from '$lib/utils/directus';
import { getDropletByClaimCode, getItadmDropletCounts } from '$lib/utils/digitalocean';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const slug = params.slug ? params.slug.split('/').pop() : '/';

	const pageList = await readItems('itadm_content', {
		filter: {
			slug: { _eq: slug },
			hidden: { _eq: false }
		},
		fields: ['*', 'childs.*']
	});
	if (!pageList.length) return fail(404, 'Content not found');
	const page = pageList[0];
	const html = await compile(page.text);

	const childs = await readItems('itadm_content', {
		filter: {
			parent: { _eq: page.id },
			hidden: { _eq: false }
		},
		fields: ['*']
	});

	let droplet = null;
	let totalDropletsCount = 0;
	let freeDropletsCount = 0;
	const claimCode = cookies.get('droplet_claimCode');
	if (claimCode) {
		droplet = await getDropletByClaimCode(claimCode);
		if (!droplet) {
			cookies.delete('droplet_claimCode', { path: '/' });
		}
	}

	if (!droplet) {
		const counts = await getItadmDropletCounts();
		totalDropletsCount = counts.total;
		freeDropletsCount = counts.free;
	}

	return {
		page,
		childs,
		html,
		droplet,
		totalDropletsCount,
		freeDropletsCount
	};
};
