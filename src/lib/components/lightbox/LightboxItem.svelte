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
	let elementIndex = 0;

	onMount(() => {
		elementIndex = registerElement(lightboxContent || children, gallery);
	});

	onDestroy(() => {
		if (browser) {
			removeElement(elementIndex);
		}
	});

	function handleOpen() {
		openLightbox(elementIndex, gallery);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleOpen();
		}
	}
</script>

<div
	class="cursor-pointer"
	role="button"
	tabindex="0"
	aria-label="Bild vergrößern"
	onclick={handleOpen}
	onkeydown={handleKeydown}
>
	{@render children?.()}
</div>
