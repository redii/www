import { error } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import { readItems } from '$lib/utils/directus';
import { getDropletsByTag } from '$lib/utils/digitalocean';
import type { PageServerLoad } from './$types';
import type { Droplet } from '$lib/types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const slug = params.slug ? params.slug.split('/').pop() : '/';

	const pageList = await readItems('itadm_content', {
		filter: {
			slug: { _eq: slug }
		},
		fields: ['*', 'childs.*']
	});
	if (!pageList.length) throw error(404, 'Content not found');
	const page = pageList[0];
	const html = await compile(page.text);

	let droplet = null;
	let totalDropletsCount = 0;
	let freeDropletsCount = 0;
	const claimCode = cookies.get('droplet_claimCode');
	if (claimCode) {
		const result = await getDropletsByTag(claimCode);
		if (result.droplets.length) {
			droplet = {
				id: result.droplets[0].id,
				status: result.droplets[0].status,
				name: result.droplets[0].name,
				region: result.droplets[0].region.slug,
				size: result.droplets[0].size.slug,
				ipv4: result.droplets[0].networks.v4.find((a) => !a.ip_address.startsWith('10.'))
					?.ip_address,
				claimCode
			} satisfies Droplet;
		} else {
			cookies.delete('droplet_claimCode', { path: '/' });
		}
	}

	if (!droplet) {
		const allDroplets = (await getDropletsByTag('itadm'))?.droplets || [];
		totalDropletsCount = allDroplets.length;
		freeDropletsCount = allDroplets.filter((d) => d.tags.length === 1).length;
	}

	return {
		page,
		html,
		droplet,
		totalDropletsCount,
		freeDropletsCount
	};
};
