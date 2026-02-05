import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { env } from '$env/dynamic/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		GitHub({
			clientId: env.PRIVATE_AUTH_GITHUB_ID,
			clientSecret: env.PRIVATE_AUTH_GITHUB_SECRET
		})
	],
	secret: env.PRIVATE_AUTH_SECRET,
	trustHost: env.PRIVATE_AUTH_TRUST_HOST === 'true',
	pages: {
		signIn: '/login',
		signOut: '/logout'
	},
	callbacks: {
		async session({ session, token }) {
			// Add github id to session
			session.user.id = String(token.id);
			return session;
		},
		async jwt({ token, account }) {
			// Persist custom claims to the token
			if (account) token.id = account.providerAccountId;
			return token;
		}
	}
});
