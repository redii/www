<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidateAll, goto } from '$app/navigation';

	onMount(() => {
		invalidateAll();
		setTimeout(() => {
			goto('/?logged-out', { replaceState: true });
		}, 1000);
	});
</script>

Du wirst gleich weitergeleitet...
