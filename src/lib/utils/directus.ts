import {
	createDirectus,
	staticToken,
	rest,
	createItem as d_createItem,
	readItem as d_readItem,
	readItems as d_readItems
} from '@directus/sdk';

import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

const client = createDirectus(publicEnv.PUBLIC_DIRECTUS_URL)
	.with(staticToken(privateEnv.PRIVATE_DIRECTUS_TOKEN))
	.with(rest({ credentials: 'include' }));

async function createItem(collection: string, data: object) {
	try {
		return await client.request(d_createItem(collection, data));
	} catch (error) {
		console.error('Error creating item:', error);
		throw error;
	}
}

async function readItem(collection: string, id: number | string) {
	try {
		return await client.request(d_readItem(collection, id));
	} catch (error) {
		console.error('Error reading item:', error);
		throw error;
	}
}

async function readItems(collection: string, options = {}) {
	try {
		return await client.request(d_readItems(collection, options));
	} catch (error) {
		console.error('Error reading items:', error);
		throw error;
	}
}

export { client, createItem, readItem, readItems };
