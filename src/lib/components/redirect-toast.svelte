<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { showToast } from '$lib/utils/show-toast';

	const redirectToasts: Toast[] = [
		{
			type: 'success',
			title: 'Du wurdest ausgeloggt',
			description: 'Deine Sitzung wurde erfolgreich beendet'
		}
	];

	const redirectToastNames = ['logged-out'];

	afterNavigate(() => {
		for (const [key] of page.url.searchParams.entries()) {
			const index = redirectToastNames.indexOf(key);
			if (index === -1) return;
			showToast(redirectToasts[index]);
			break;
		}
	});
</script>
