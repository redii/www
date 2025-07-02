import { PRIVATE_VACATIONS_PASSWORD } from '$env/static/private';

export const load = async ({ locals, cookies }) => {
	const session = await locals.auth();
	let showVacationLink = cookies.get('vacations_password') === PRIVATE_VACATIONS_PASSWORD;

	return {
		session,
		showVacationLink
	};
};
