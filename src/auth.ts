import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [GitHub],
	pages: {
		signIn: '/login',
		signOut: '/logout'
	},
	trustHost: true
});
