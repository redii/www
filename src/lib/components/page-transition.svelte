<script lang="ts">
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';

	let { children } = $props();

	// track lastPathname to adjust transition
	// from /itadm to /itadm/linux: fly left
	// from /itadm/linux to /itadm: fly right
	let lastPathname = $state(page.url.pathname);
	$effect(() => {
		if (lastPathname !== page.url.pathname) lastPathname = page.url.pathname;
	});
</script>

{#key page.url.pathname}
	<div
		in:fly={{
			x: lastPathname.length >= page.url.pathname.length ? -200 : 200,
			duration: 200,
			delay: 200
		}}
		out:fly={{
			x: lastPathname.length >= page.url.pathname.length ? 200 : -200,
			duration: 200
		}}
	>
		{@render children?.()}
	</div>
{/key}
