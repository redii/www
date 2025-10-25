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
	let id = crypto.randomUUID();

	onMount(() => {
		elementIndex = registerElement(lightboxContent || children, gallery);
		document.getElementById(id)?.addEventListener('click', handleClick);
	});

	onDestroy(() => {
		if (browser) {
			removeElement(elementIndex);
			document.getElementById(id)?.removeEventListener('click', handleClick);
		}
	});

	function handleClick() {
		openLightbox(elementIndex, gallery);
	}
</script>

<div {id} class="cursor-pointer">
	{@render children?.()}
</div>
