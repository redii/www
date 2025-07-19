<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import AppHeader from '$lib/components/app-header.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full">
		<AppHeader />
		<div class="mx-auto w-full max-w-4xl px-4 py-12 md:px-6">
			{@render children?.()}
		</div>
	</main>
</Sidebar.Provider>
