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
	import X from 'lucide-svelte/icons/x';

	let api = $state<CarouselAPI>();
	$effect(() => {
		if (api) {
			api.on('select', (i) => {
				currentElementIndex.set(i.selectedScrollSnap());
			});
		}
	});
</script>

{#if typeof $currentElementIndex === 'number'}
	<div
		id="lightbox-overlay"
		class="pointer-events-auto fixed inset-0 z-50 bg-black/80"
		transition:fade={{ duration: 200 }}
		use:portal
	>
		<Carousel.Root
			setApi={(emblaApi: any) => (api = emblaApi)}
			opts={{
				startIndex: $currentElementIndex
			}}
			class="mx-auto max-w-5xl"
		>
			<div class="flex items-center justify-between p-6">
				<p class="font-mono tracking-wider text-white">
					{$currentElementIndex + 1}/{$lightboxGalleries[$currentGalleryIndex].elements.length}
				</p>
				<Button size="icon" onclick={closeLightbox}>
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

			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
{/if}
