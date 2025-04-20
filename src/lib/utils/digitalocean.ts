import { PRIVATE_DO_URL, PRIVATE_DO_TOKEN } from '$env/static/private';

export async function getDropletsByTag(tag: string) {
	try {
		const response = await fetch(`${PRIVATE_DO_URL}/droplets?tag_name=${tag}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${PRIVATE_DO_TOKEN}`
			}
		});
		if (!response.ok) throw new Error(`Error fetching droplets: ${response.statusText}`);
		const data = await response.json();
		data.droplets = data.droplets.sort((a, b) => (a.name > b.name ? 1 : -1));
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

function generateClaimCode() {
	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let code = '';
	for (let i = 0; i < 5; i++) {
		code += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return code;
}

export async function claimDroplet() {
	try {
		const data = await getDropletsByTag('itadm');
		const droplet = data.droplets.find((d) => d.tags.length === 1);
		if (!droplet) return false;

		const claimCode = generateClaimCode();
		const tag_response = await fetch(`${PRIVATE_DO_URL}/tags`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${PRIVATE_DO_TOKEN}`
			},
			body: JSON.stringify({ name: claimCode })
		});
		if (!tag_response.ok) throw new Error(`Error creating tag: ${tag_response.statusText}`);

		const tagging_response = await fetch(`${PRIVATE_DO_URL}/tags/${claimCode}/resources`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${PRIVATE_DO_TOKEN}`
			},
			body: JSON.stringify({
				resources: [{ resource_id: String(droplet.id), resource_type: 'droplet' }]
			})
		});
		if (!tagging_response.ok)
			throw new Error(`Error tagging droplet: ${tagging_response.statusText}`);

		return {
			claimCode,
			droplet
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}
