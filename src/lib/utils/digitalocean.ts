import { PRIVATE_DO_URL, PRIVATE_DO_TOKEN } from '$env/static/private';
import type { Droplet, DODropletRaw } from '$lib/types';

// ---------------------------------------------------------------------------
// Low-level helpers
// ---------------------------------------------------------------------------

const ITADM_TAG = 'itadm';

async function doFetch<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
	const response = await fetch(`${PRIVATE_DO_URL}${path}`, {
		...init,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${PRIVATE_DO_TOKEN}`,
			...init.headers
		}
	});
	if (!response.ok) {
		throw new Error(`DigitalOcean API error: ${response.status} ${response.statusText}`);
	}
	if (response.status === 204) return undefined as T;
	return response.json() as Promise<T>;
}

/** Extract the public (non-private) IPv4 address from a raw droplet. */
function getPublicIpv4(raw: DODropletRaw): string {
	return raw.networks.v4.find((a) => !a.ip_address.startsWith('10.'))?.ip_address ?? '';
}

/** Derive the claim code (= the non-'itadm' tag) from a raw droplet. */
function getClaimCode(raw: DODropletRaw): string {
	return raw.tags.find((t) => t !== ITADM_TAG) ?? '';
}

/** Map a raw DO API droplet to our typed Droplet, using an optional explicit claim code. */
export function toDroplet(raw: DODropletRaw, claimCode?: string): Droplet {
	return {
		id: raw.id,
		status: raw.status,
		name: raw.name,
		region: raw.region.slug,
		size: raw.size.slug,
		ipv4: getPublicIpv4(raw),
		claimCode: claimCode ?? getClaimCode(raw)
	};
}

// ---------------------------------------------------------------------------
// Droplet queries
// ---------------------------------------------------------------------------

/** Fetch all raw droplets for a given tag, sorted by name. */
export async function getRawDropletsByTag(tag: string): Promise<DODropletRaw[]> {
	const data = await doFetch<{ droplets: DODropletRaw[] }>(
		`/droplets?tag_name=${encodeURIComponent(tag)}&per_page=200`
	);
	return data.droplets.sort((a, b) => a.name.localeCompare(b.name));
}

/** Fetch all ITADM droplets already mapped to typed Droplets. */
export async function getItadmDroplets(): Promise<Droplet[]> {
	const raw = await getRawDropletsByTag(ITADM_TAG);
	return raw.map((d) => toDroplet(d));
}

/** Return counts of total and free (unclaimed) ITADM droplets. */
export async function getItadmDropletCounts(): Promise<{
	total: number;
	free: number;
}> {
	const raw = await getRawDropletsByTag(ITADM_TAG);
	return {
		total: raw.length,
		free: raw.filter((d) => d.tags.length === 1).length
	};
}

/** Find the droplet claimed with a given code and return it typed, or null. */
export async function getDropletByClaimCode(claimCode: string): Promise<Droplet | null> {
	const raw = await getRawDropletsByTag(claimCode);
	if (!raw.length) return null;
	return toDroplet(raw[0], claimCode);
}

// ---------------------------------------------------------------------------
// Droplet mutations
// ---------------------------------------------------------------------------

export async function createTag(tagName: string): Promise<void> {
	await doFetch('/tags', {
		method: 'POST',
		body: JSON.stringify({ name: tagName })
	});
}

export async function tagDroplet(dropletId: number | string, tagName: string): Promise<void> {
	await doFetch(`/tags/${encodeURIComponent(tagName)}/resources`, {
		method: 'POST',
		body: JSON.stringify({
			resources: [{ resource_id: String(dropletId), resource_type: 'droplet' }]
		})
	});
}

export async function deleteDropletsByTag(tagName: string): Promise<void> {
	await doFetch(`/droplets?tag_name=${encodeURIComponent(tagName)}`, {
		method: 'DELETE'
	});
}

// ---------------------------------------------------------------------------
// Claim logic
// ---------------------------------------------------------------------------

function generateClaimCode(): string {
	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let code = '';
	for (let i = 0; i < 5; i++) {
		code += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return code;
}

export async function claimDroplet(claimCode?: string): Promise<{
	success: boolean;
	toast: Toast;
	droplet?: Droplet;
}> {
	const raw = await getRawDropletsByTag(ITADM_TAG);

	// Reconnect by existing claim code
	if (claimCode) {
		const match = raw.find((d) => d.tags.includes(claimCode));
		if (!match) {
			return {
				success: false,
				toast: {
					type: 'warning',
					title: 'Fehler beim Zuweisen',
					description: 'Kein Server mit diesem Claim-Code gefunden'
				}
			};
		}
		return {
			success: true,
			droplet: toDroplet(match, claimCode),
			toast: {
				type: 'success',
				title: 'Server erfolgreich zugewiesen',
				description: 'Viel Spaß im Unterricht 🎉'
			}
		};
	}

	// Claim a free droplet (one that only has the 'itadm' tag)
	const free = raw.find((d) => d.tags.length === 1);
	if (!free) {
		return {
			success: false,
			toast: {
				type: 'warning',
				title: 'Fehler beim Zuweisen',
				description: 'Es ist aktuell kein freier Server vorhanden'
			}
		};
	}

	const newCode = generateClaimCode();
	await createTag(newCode);
	await tagDroplet(free.id, newCode);

	return {
		success: true,
		droplet: toDroplet(free, newCode),
		toast: {
			type: 'success',
			title: 'Server erfolgreich zugewiesen',
			description: 'Viel Spaß im Unterricht 🎉'
		}
	};
}
