import { signIn } from '../../../auth';
import type { PageServerLoad, Actions } from './$types';
export const actions: Actions = { default: signIn };

export const load: PageServerLoad = async () => {
	return { hideBreadcrumbs: true };
};
