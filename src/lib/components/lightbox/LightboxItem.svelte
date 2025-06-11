<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { registerElement, openLightbox } from '$lib/components/lightbox/lightboxStore';

	interface Props {
		thumbnail?: string;
		alt?: string;
		gallery?: string;
		children: Snippet;
		lightboxContent?: Snippet;
	}

	let { thumbnail, alt, gallery = 'default', children, lightboxContent }: Props = $props();
	let elementIndex = 0 as number;

	onMount(() => {
		elementIndex = registerElement(lightboxContent || children, gallery);
	});
</script>

<button onclick={() => openLightbox(elementIndex, gallery)}>
	{#if thumbnail}
		<img src={thumbnail} {alt} />
	{:else}
		{@render children?.()}
	{/if}
</button>
