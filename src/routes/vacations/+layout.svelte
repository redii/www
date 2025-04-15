<script lang="ts">
	let { children } = $props();
</script>

<main class="mx-auto min-h-[calc(100vh-64px-128px)] max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
	{@render children()}
</main>
