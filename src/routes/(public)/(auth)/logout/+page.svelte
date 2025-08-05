<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidateAll, goto } from '$app/navigation';

	onMount(() => {
		// invalidateAll();
		const i = setInterval(() => {
			if (msUntilRedirect !== 0) {
				msUntilRedirect -= 100;
			} else {
				goto('/?logged-out');
				clearInterval(i);
			}
		}, 100);
	});

	let msUntilRedirect: number = $state(3000);
</script>

<div class="text-center">
	<small class="text-sm leading-none font-medium">
		Du wirst in {msUntilRedirect / 1000} Sekunden automatisch weitergeleitet ⏳
	</small>
	<p class="mt-4 text-sm text-muted-foreground">
		<a href="/?logged-out">Direkt zur Startseite &rarr;</a>
	</p>
</div>
