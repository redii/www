<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		lightboxGalleries,
		currentElementIndex,
		currentGalleryIndex,
		closeLightbox
	} from '$lib/components/lightbox/lightboxStore';

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
		class="fixed inset-0 z-50 bg-black/80"
		transition:fade={{ duration: 200 }}
	>
		<div class="flex h-full items-center justify-center md:px-16">
			<Carousel.Root
				setApi={(emblaApi) => (api = emblaApi)}
				opts={{
					startIndex: $currentElementIndex,
					loop: true
				}}
			>
				<div class="fixed left-0 top-0 w-full p-6">
					<div class="flex items-center justify-between">
						<p class="font-mono tracking-wider text-white">
							{$currentElementIndex + 1}/{$lightboxGalleries[$currentGalleryIndex].elements.length}
						</p>
						<Button size="icon" onclick={closeLightbox}>
							<X />
						</Button>
					</div>
				</div>
				<Carousel.Content id="lightbox-carousel-content">
					{#each $lightboxGalleries[$currentGalleryIndex].elements as element}
						<Carousel.Item
							class="flex h-fit max-h-[70dvh] max-w-[100vw] justify-center md:max-w-5xl"
						>
							{@render element?.()}
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Previous />
				<Carousel.Next />
			</Carousel.Root>
		</div>
	</div>
{/if}
