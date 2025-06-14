<script lang="ts">
	import { onMount, onDestroy, type Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import { registerElement, removeElement, openLightbox } from '$lib/components/lightbox';

	interface Props {
		gallery?: string;
		children: Snippet;
		lightboxContent?: Snippet;
	}

	let { gallery = 'default', children, lightboxContent }: Props = $props();
	let elementIndex = 0 as number;

	onMount(() => {
		elementIndex = registerElement(lightboxContent || children, gallery);
	});

	onDestroy(() => {
		if (browser) removeElement(elementIndex);
	});
</script>

<button onclick={() => openLightbox(elementIndex, gallery)}>
	<div>
		{@render children?.()}
	</div>
</button>
