<script lang="ts">
	import { fade } from 'svelte/transition';
	import portal from '$lib/utils/portal';
	import {
		lightboxGalleries,
		currentElementIndex,
		currentGalleryIndex,
		closeLightbox
	} from '$lib/components/lightbox';

	import { type CarouselAPI } from '$lib/components/ui/carousel/context';
	import * as Carousel from '$lib/components/ui/carousel';
	import { Button } from '$lib/components/ui/button';
	import X from '@lucide/svelte/icons/x';

	let api = $state<CarouselAPI>();
	let closeButtonEl = $state<HTMLButtonElement | null>(null);

	$effect(() => {
		if (api) {
			api.on('select', (i) => {
				currentElementIndex.set(i.selectedScrollSnap());
			});
		}
	});

	// Focus the close button when overlay opens
	$effect(() => {
		if (typeof $currentElementIndex === 'number' && closeButtonEl) {
			closeButtonEl.focus();
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeLightbox();
		else if (e.key === 'ArrowLeft') api?.scrollPrev();
		else if (e.key === 'ArrowRight') api?.scrollNext();
	}
</script>

{#if typeof $currentElementIndex === 'number'}
	<div
		id="lightbox-overlay"
		class="pointer-events-auto fixed inset-0 z-50 bg-black/80"
		role="dialog"
		aria-modal="true"
		aria-label="Bildvorschau"
		tabindex="-1"
		transition:fade={{ duration: 200 }}
		use:portal
		onclick={(e) => {
			if (e.target === e.currentTarget) closeLightbox();
		}}
		onkeydown={handleKeydown}
	>
		<Carousel.Root
			setApi={(emblaApi) => (api = emblaApi)}
			opts={{
				startIndex: $currentElementIndex
			}}
			class="mx-auto max-w-5xl"
		>
			<div class="flex items-center justify-between p-6">
				<p class="font-mono tracking-wider text-white" aria-live="polite">
					{$currentElementIndex + 1}/{$lightboxGalleries[$currentGalleryIndex].elements.length}
				</p>
				<Button
					bind:ref={closeButtonEl}
					size="icon"
					onclick={closeLightbox}
					aria-label="Lightbox schließen"
				>
					<X />
				</Button>
			</div>

			<Carousel.Content id="lightbox-content" class="mt-8 h-[calc(100dvh-200px)] px-2">
				{#each $lightboxGalleries[$currentGalleryIndex].elements as element}
					<Carousel.Item>
						{@render element?.()}
					</Carousel.Item>
				{/each}
			</Carousel.Content>

			<Carousel.Previous aria-label="Vorheriges Bild" />
			<Carousel.Next aria-label="Nächstes Bild" />
		</Carousel.Root>
	</div>
{/if}
