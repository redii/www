import { PRIVATE_DO_URL, PRIVATE_DO_TOKEN } from '$env/static/private';
import type { Droplet } from '$lib/types';

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

export async function claimDroplet(claimCode?: string): Promise<{
	success: boolean;
	toast: Toast;
	droplet?: Droplet;
}> {
	try {
		const droplets = (await getDropletsByTag('itadm')).droplets;
		let droplet;

		if (claimCode) {
			droplet = droplets.find((d) => d.tags.includes(claimCode));
			if (!droplet) {
				return {
					success: false,
					toast: {
						type: 'warning',
						title: 'Fehler beim Zuweisen',
						description: 'Kein Server mit diesem Claim-Code gefunden'
					} satisfies Toast
				};
			} else {
				return {
					success: true,
					droplet: {
						id: droplet.id,
						status: droplet.status,
						name: droplet.name,
						region: droplet.region.slug,
						size: droplet.size.slug,
						ipv4: droplet.networks.v4.find((a) => !a.ip_address.startsWith('10.'))?.ip_address,
						claimCode
					} satisfies Droplet,
					toast: {
						type: 'success',
						title: 'Server erfolgreich zugewiesen',
						description: 'Viel Spaß im Unterricht 🎉'
					} satisfies Toast
				};
			}
		}

		droplet = droplets.find((d) => d.tags.length === 1);
		if (!droplet) {
			return {
				success: false,
				toast: {
					type: 'warning',
					title: 'Fehler beim Zuweisen',
					description: 'Es ist aktuell kein freier Server vorhanden'
				} satisfies Toast
			};
		}

		claimCode = generateClaimCode();
		await createTag(claimCode);
		await tagDroplet(droplet.id, claimCode);

		return {
			success: true,
			droplet: {
				id: droplet.id,
				status: droplet.status,
				name: droplet.name,
				region: droplet.region.slug,
				size: droplet.size.slug,
				ipv4: droplet.networks.v4.find((a) => !a.ip_address.startsWith('10.'))?.ip_address,
				claimCode
			} satisfies Droplet,
			toast: {
				type: 'success',
				title: 'Server erfolgreich zugewiesen',
				description: 'Viel Spaß im Unterricht 🎉'
			} satisfies Toast
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}

function generateClaimCode(): string {
	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let code = '';
	for (let i = 0; i < 5; i++) {
		code += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return code;
}

export async function createTag(tagName: string) {
	try {
		const response = await fetch(`${PRIVATE_DO_URL}/tags`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${PRIVATE_DO_TOKEN}`
			},
			body: JSON.stringify({ name: tagName })
		});
		if (!response.ok) throw new Error(`Error creating tag: ${response.statusText}`);
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function tagDroplet(dropletId: number | string, tagName: string) {
	try {
		const response = await fetch(`${PRIVATE_DO_URL}/tags/${tagName}/resources`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${PRIVATE_DO_TOKEN}`
			},
			body: JSON.stringify({
				resources: [{ resource_id: String(dropletId), resource_type: 'droplet' }]
			})
		});
		if (!response.ok) throw new Error(`Error tagging droplet: ${response.statusText}`);
		return response.ok;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function deleteDropletsByTag(tagName: string) {
	try {
		const response = await fetch(`${PRIVATE_DO_URL}/droplets?tag_name=${tagName}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${PRIVATE_DO_TOKEN}`
			}
		});
		if (!response.ok) throw new Error(`Error deleting droplets: ${response.statusText}`);
		return response.ok;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
