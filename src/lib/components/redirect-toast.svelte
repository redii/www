<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	const redirectToasts = [
		{
			name: 'logged-out',
			title: 'Du wurdest ausgeloggt',
			description: 'Deine Sitzung wurde erfolgreich beendet',
			type: 'success'
		}
	];

	afterNavigate(() => {
		for (const [key] of page.url.searchParams.entries()) {
			const rt = redirectToasts.find((rt) => rt.name === key);
			if (!rt) return;
			if (rt.type === 'success') {
				toast.success(rt.title, {
					description: rt.description
				});
			} else if (rt.type === 'info') {
				toast.info(rt.title, {
					description: rt.description
				});
			} else if (rt.type === 'warning') {
				toast.warning(rt.title, {
					description: rt.description
				});
			} else if (rt.type === 'error') {
				toast.error(rt.title, {
					description: rt.description
				});
			} else {
				toast(rt.title, {
					description: rt.description
				});
			}
			break;
		}
	});
</script>
