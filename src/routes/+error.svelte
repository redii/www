<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="mt-12 text-center">
	<p class="mb-6 font-bold text-emerald-500">
		{page.status}
		{page.error?.message}
	</p>
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		{#if page.status === 404}
			Seite nicht gefunden 👀
		{:else}
			Da ist etwas schiefgelaufen 😧
		{/if}
	</h1>
	<div class="mt-12 flex items-center justify-center gap-8">
		<Button href="/">Zur Startseite</Button>
		<a href="mailto:error@akmann.dev">Email schreiben <span aria-hidden="true">&rarr;</span></a>
	</div>
</div>
