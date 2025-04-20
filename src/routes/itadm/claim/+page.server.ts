import { claimDroplet, getDropletsByTag } from '$lib/utils/digitalocean';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	return { hideBreadcrumbs: true };
};

export const actions = {
	claimDroplet: async ({ cookies }) => {
		try {
			const result = await claimDroplet();
			if (!result) {
				return {
					success: false,
					notification: {
						type: 'warning',
						title: 'Fehler beim Zuweisen des Servers',
						description: 'Es ist aktuell kein freier Server vorhanden'
					}
				};
			}

			cookies.set('dropletClaimCode', result.claimCode, { path: '/' });

			return {
				success: true,
				droplet: {
					claimCode: result.claimCode,
					id: result.droplet.id,
					name: result.droplet.name,
					ipv4: result.droplet.networks.v4.find((a) => !a.ip_address.startsWith('10.')).ip_address,
					region: result.droplet.region.name
				},
				notification: {
					type: 'success',
					title: 'Server erfolgreich zugewiesen',
					description: 'Viel Spaß im Unterricht 🎉'
				}
			};
		} catch (error) {
			console.error('Error in claimDroplet action:', error);
			return {
				success: false,
				notification: {
					type: 'error',
					title: 'Fehler beim Zuweisen des Servers',
					description: error
				}
			};
		}
	},
	connectDroplet: async ({ request, cookies }) => {
		try {
			const data = await request.formData();
			if (!data.get('claimCode')) {
				return {
					success: false,
					notification: {
						type: 'warning',
						title: 'Fehler beim Verbinden',
						description: 'Kein Claim-Code angegeben'
					}
				};
			}

			const result = await getDropletsByTag(String(data.get('claimCode')));
			if (!result.droplets?.length) {
				return {
					success: false,
					notification: {
						type: 'warning',
						title: 'Fehler beim Verbinden',
						description: 'Kein Server mit diesem Claim-Code gefunden'
					}
				};
			} else {
				cookies.set('dropletClaimCode', String(data.get('claimCode')), { path: '/' });
			}

			return {
				success: true,
				droplet: {
					claimCode: data.get('claimCode'),
					id: result.droplets[0].id,
					name: result.droplets[0].name,
					ipv4: result.droplets[0].networks.v4.find((a) => !a.ip_address.startsWith('10.'))
						.ip_address,
					region: result.droplets[0].region.name
				},
				notification: {
					type: 'success',
					title: 'Server erfolgreich verknüpft',
					description: 'Viel Spaß im Unterricht 🎉'
				}
			};
		} catch (error) {
			console.error('Error in connectDroplet action:', error);
			return {
				success: false,
				notification: {
					type: 'error',
					title: 'Fehler beim Verknüpfen des Servers',
					description: error
				}
			};
		}
	},
	disconnectDroplet: async ({ cookies }) => {
		try {
			cookies.delete('dropletClaimCode', { path: '/' });

			return {
				success: true,
				notification: {
					type: 'success',
					title: 'Server wurde getrennt'
				}
			};
		} catch (error) {
			console.error('Error in disconnectDroplet action:', error);
			return {
				success: false,
				notification: {
					type: 'error',
					title: 'Fehler beim Trennen des Servers',
					description: error
				}
			};
		}
	}
} satisfies Actions;
