import { signIn } from '$lib/utils/auth';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	return { hideBreadcrumbs: true };
};

export const actions: Actions = { default: signIn };
