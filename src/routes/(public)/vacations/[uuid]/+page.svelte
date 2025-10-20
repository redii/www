<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import LightboxItem from '$lib/components/lightbox/LightboxItem.svelte';
	import Gmaps from '$lib/components/gmaps.svelte';
	import Share2 from '@lucide/svelte/icons/share-2';
	import MapPinned from '@lucide/svelte/icons/map-pinned';

	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	export let data;

	const startDate = new Date(data.vacation.start_date);
	const vacationMonth = startDate.toLocaleString('de', { month: 'long' });
	const vacationYear = startDate.getFullYear();
</script>

<svelte:head>
	<title>
		{data.vacation.title} ·
		{vacationMonth}
		{vacationYear}
	</title>
</svelte:head>

{#if data.vacation.image}
	<img
		src={`${PUBLIC_DIRECTUS_URL}/assets/${data.vacation.image}?format=webp&width=1024`}
		alt={data.vacation.title}
		class="max-h-80 w-full rounded-2xl border border-foreground/10 bg-muted object-cover object-center shadow-sm sm:max-h-[400px]"
	/>
{/if}

<section id="vacation-heading" class="mt-8 mb-16">
	<div class="flex flex-col items-center items-start justify-between gap-4 sm:flex-row">
		<div>
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{data.vacation.title}
			</h1>
			<time datetime={data.vacation.start_date} class="mt-1 block text-lg md:mt-2">
				{vacationMonth}
				{vacationYear}
			</time>
		</div>
		<div class="flex flex-row gap-2">
			<Button
				variant="secondary"
				size="icon"
				class="size-12"
				onclick={async () => {
					const url = new URL(window.location.href);
					url.search = '';
					url.searchParams.set('password', data.vacationPassword);
					if (navigator.share) {
						await navigator.share({
							title: `${data.vacation.title} · ${vacationMonth} ${vacationYear}`,
							url: url.toString()
						});
					} else {
						navigator.clipboard.writeText(url.toString());
						toast.success('Link zum teilen wurde in die Zwischenablage gelegt');
					}
				}}
			>
				<Share2 class="size-5" />
				<span class="sr-only">Teilen</span>
			</Button>
			<LightboxItem gallery={`locations-${data.vacation.id}`}>
				<Button variant="secondary" size="icon" class="size-12">
					<MapPinned class="size-5" />
					<span class="sr-only">Übersichtskarte anzeigen</span>
				</Button>
				{#snippet lightboxContent()}
					<Gmaps
						location={{
							lat: data.vacation.location.coordinates[1],
							lng: data.vacation.location.coordinates[0]
						}}
						zoom={data.vacation.location_zoom}
						markers={data.vacationDays.map((vd) => {
							if (vd.location)
								return {
									lat: vd.location.coordinates[1],
									lng: vd.location.coordinates[0]
								};
						})}
						class="h-[60vh] w-full"
					/>
				{/snippet}
			</LightboxItem>
		</div>
	</div>
</section>

<ul class="mb-10 flex flex-col gap-16">
	{#each data.vacationDays as day}
		{@const dayDate = new Date(day.date)}
		{@const longitude = day.location?.coordinates[0]}
		{@const latitude = day.location?.coordinates[1]}
		<li>
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
				{@html day.text.trim().replace(/\n/g, '<br>')}
			</p>

			{#if day.images.length}
				<div class="mt-4 grid grid-cols-3 items-center justify-center gap-2">
					{#each day.images as entry}
						<LightboxItem gallery={`ìmages-${data.vacation.id}`}>
							<AspectRatio ratio={1}>
								<img
									src={`${PUBLIC_DIRECTUS_URL}/assets/${entry.image}?format=webp&height=320&width=320`}
									alt={entry.description}
									class="h-full w-full rounded-xl bg-muted object-cover"
									loading="lazy"
								/>
							</AspectRatio>
							{#snippet lightboxContent()}
								<img
									src={`${PUBLIC_DIRECTUS_URL}/assets/${entry.image}?format=webp&quality=75&width=1600&withoutEnlargement=true`}
									alt={entry.description}
									class="h-full w-full object-contain"
									loading="lazy"
								/>
							{/snippet}
						</LightboxItem>
					{/each}
				</div>
			{/if}

			{#if longitude && latitude}
				<div class="mt-4">
					<LightboxItem gallery={`locations-${data.vacation.id}`}>
						<Button variant="outline">📍 Karte anzeigen</Button>
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
				</div>
			{/if}
		</li>
	{/each}
</ul>
