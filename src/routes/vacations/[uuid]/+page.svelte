<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import LightboxItem from '$lib/components/lightbox/LightboxItem.svelte';
	import Gmaps from '$lib/components/gmaps.svelte';
	import MapPinned from '@lucide/svelte/icons/map-pinned';

	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	export let data;

	const startDate = new Date(data.vacation.start_date);
	const vacationMonth = startDate.toLocaleString('de', { month: 'long' });
	const vacationYear = startDate.getFullYear();
</script>

<img
	src={`${PUBLIC_DIRECTUS_URL}/assets/${data.vacation.image}?width=1024`}
	alt={data.vacation.title}
	class="max-h-80 w-full rounded-2xl border border-foreground/10 bg-muted object-cover object-center shadow-sm sm:max-h-[400px]"
/>

<section id="vacation-heading" class="mb-16 mt-8">
	<div class="flex flex-row items-start items-center justify-between gap-4">
		<div>
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{data.vacation.title}
			</h1>
			<time datetime={data.vacation.start_date} class="mt-1 block text-lg md:mt-2">
				{vacationMonth}
				{vacationYear}
			</time>
		</div>
		<LightboxItem gallery={`locations-${data.vacation.id}`}>
			<Button variant="secondary" size="icon" class="size-12">
				<MapPinned />
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
					class="mx-auto h-[60vh] w-96 sm:w-[500px] md:w-[700px] lg:w-[920px] xl:w-[1000px]"
				/>
			{/snippet}
		</LightboxItem>
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
							<AspectRatio ratio={1} class="bg-muted">
								<img
									src={`${PUBLIC_DIRECTUS_URL}/assets/${entry.image}?height=512&width=512&quality=75`}
									alt={entry.description}
									loading="lazy"
									class="h-full w-full rounded-xl object-cover"
								/>
							</AspectRatio>
							{#snippet lightboxContent()}
								<img
									src={`${PUBLIC_DIRECTUS_URL}/assets/${entry.image}?quality=75`}
									alt={entry.description}
									class="h-full w-full object-contain"
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
								class="mx-auto h-[60vh] w-96 sm:w-[500px] md:w-[700px] lg:w-[920px] xl:w-[1000px]"
							/>
						{/snippet}
					</LightboxItem>
				</div>
			{/if}
		</li>
	{/each}
</ul>
