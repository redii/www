<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Button } from '$lib/components/ui/button';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import LightboxItem from '$lib/components/lightbox/LightboxItem.svelte';
	import Gmaps from '$lib/components/gmaps.svelte';
	import VideoPlayer from '$lib/components/video-player.svelte';
	import MapPinned from '@lucide/svelte/icons/map-pinned';
	import Footprints from '@lucide/svelte/icons/footprints';
	import Gauge from '@lucide/svelte/icons/gauge';
	import SquareArrowOutUpRight from '@lucide/svelte/icons/square-arrow-out-up-right';
	import Info from '@lucide/svelte/icons/info';
	import DayComments from './day-comments.svelte';
	import Reactions from './day-reactions.svelte';

	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	interface Props {
		day: any;
		vacationId: string;
	}

	let { day, vacationId }: Props = $props();

	const dayDate = new Date(day.date);
	const longitude = day.location?.coordinates[0];
	const latitude = day.location?.coordinates[1];
</script>

<article>
	<div class="mb-4 border-b">
		<time datetime={day.date} class="text-muted-foreground">
			{dayDate.toLocaleDateString('de')}
		</time>
		<h2
			class="scroll-m-20 pb-1 text-3xl font-semibold tracking-tight transition-colors first:mt-0 lg:pb-2"
		>
			{day.title}
		</h2>
	</div>

	<p class="leading-7 [&:not(:first-child)]:mt-6">
		{@html day.text?.trim().replace(/\n/g, '<br>')}
	</p>

	{#if day.steps || day.kilometers}
		<div class="mt-3">
			{#if day.steps}
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Badge variant="outline">
								<Footprints />
								{day.steps.toLocaleString('de-DE')}
							</Badge>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Schritte gesammelt</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			{/if}
			{#if day.kilometers}
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Badge variant="outline">
								<Gauge />
								{day.kilometers} km
							</Badge>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Kilometer gefahren</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			{/if}
		</div>
	{/if}

	{#if day.images.length}
		<div class="mt-4 grid grid-cols-3 items-center justify-center gap-2">
			{#each day.images as entry}
				<LightboxItem gallery={`ìmages-${vacationId}`}>
					<div class="relative">
						<AspectRatio ratio={1}>
							<img
								src={`${PUBLIC_DIRECTUS_URL}/assets/${entry.thumbnail || entry.image}?format=webp&height=320&width=320`}
								alt={entry.description}
								class="h-full w-full rounded-xl bg-muted object-cover"
								loading="lazy"
							/>
						</AspectRatio>
						{#if entry.url}
							<div
								class="absolute right-1.5 bottom-1.5 flex size-4 items-center justify-center rounded-full bg-background/80 shadow-sm sm:right-2.5 sm:bottom-2.5 sm:size-5"
							>
								<Info class="size-3 sm:size-3.5" />
							</div>
						{/if}
					</div>
					{#snippet lightboxContent()}
						<div class="flex h-full flex-col items-center justify-center gap-3">
							{#if entry.media_type === 'video'}
								<VideoPlayer
									src={`${PUBLIC_DIRECTUS_URL}/assets/${entry.image}`}
									poster={`${PUBLIC_DIRECTUS_URL}/assets/${entry.thumbnail}?format=webp&quality=75&width=1600&withoutEnlargement=true`}
									class="min-h-0 max-h-full max-w-full"
								/>
							{:else}
								<img
									src={`${PUBLIC_DIRECTUS_URL}/assets/${entry.image}?format=webp&quality=75&width=1600&withoutEnlargement=true`}
									alt={entry.description}
									class="min-h-0 max-h-full max-w-full object-contain"
									loading="lazy"
								/>
							{/if}
							{#if entry.description || entry.url}
								<div class="flex shrink-0 items-center justify-center gap-2 text-white">
									{#if entry.description && entry.url}
										<div class="text-center">
											<a
												href={entry.url}
												target="_blank"
												rel="noopener noreferrer"
												aria-label="Link öffnen"
											>
												{entry.description || 'Link'}
												<SquareArrowOutUpRight class="relative bottom-0.5 inline size-4" />
											</a>
										</div>
									{:else if entry.description}
										<div class="text-center">{entry.description}</div>
									{/if}
								</div>
							{/if}
						</div>
					{/snippet}
				</LightboxItem>
			{/each}
		</div>
	{/if}

	<div class="mt-4 flex flex-row gap-2">
		{#if longitude && latitude}
			<LightboxItem gallery={`locations-${vacationId}`}>
				<Button variant="outline">
					<MapPinned class="size-5" />
					<span class="sr-only md:not-sr-only">Karte anzeigen</span>
				</Button>
				{#snippet lightboxContent()}
					<Gmaps
						location={{
							lat: day.location.coordinates[1],
							lng: day.location.coordinates[0]
						}}
						locationMarker={true}
						zoom={12}
						class="h-[60vh] w-full"
					/>
				{/snippet}
			</LightboxItem>
		{/if}

		<div class="grow"></div>

		<DayComments {day} />

		<Reactions
			collection="vacation_days"
			id={day.id}
			emojis={[
				{
					text: '❤️',
					value: 'red-heart',
					counter: day.reactions.filter((r: any) => r.emoji === 'red-heart').length
				},
				{
					text: '🤠',
					value: 'cowboy-hat-face',
					counter: day.reactions.filter((r: any) => r.emoji === 'cowboy-hat-face').length
				},
				{
					text: '😮',
					value: 'face-with-open-mouth',
					counter: day.reactions.filter((r: any) => r.emoji === 'face-with-open-mouth').length
				}
			]}
		/>
	</div>
</article>
