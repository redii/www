import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';

import {
	PRIVATE_AUTH_SECRET,
	PRIVATE_AUTH_TRUST_HOST,
	PRIVATE_AUTH_GITHUB_ID,
	PRIVATE_AUTH_GITHUB_SECRET
} from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		GitHub({
			clientId: PRIVATE_AUTH_GITHUB_ID,
			clientSecret: PRIVATE_AUTH_GITHUB_SECRET
		})
	],
	secret: PRIVATE_AUTH_SECRET,
	trustHost: PRIVATE_AUTH_TRUST_HOST === 'true',
	pages: {
		signIn: '/login',
		signOut: '/logout'
	}
});
