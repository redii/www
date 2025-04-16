<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { Button } from '$lib/components/ui/button';
	import { House } from 'lucide-svelte';

	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	export let data;

	const startDate = new Date(data.vacation.start_date);
	const vacationMonth = startDate.toLocaleString('de', { month: 'long' });
	const vacationYear = startDate.getFullYear();
</script>

<Breadcrumb.Root class="mb-8">
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/">
				<House size={16} />
			</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/vacations">Urlaube</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Page>{data.vacation.title}</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>

<img
	src={`${PUBLIC_DIRECTUS_URL}/assets/${data.vacation.image}`}
	alt={data.vacation.title}
	class="max-h-80 w-full rounded-2xl border border-gray-200 object-cover object-center shadow-sm sm:max-h-[400px]"
/>

<section id="vacation-heading" class="mb-16 mt-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		{data.vacation.title}
	</h1>
	<time datetime={data.vacation.start_date} class="mt-1 text-lg lg:mt-2">
		{vacationMonth}
		{vacationYear}
	</time>
</section>

<ul class="mb-10 flex flex-col gap-16">
	{#each data.vacationDays as day}
		{@const dayDate = new Date(day.date)}
		{@const longitude = day.location.coordinates[0]}
		{@const latitude = day.location.coordinates[1]}
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
				{@html day.text.replace(/\n/g, '<br>')}
			</p>

			{#if day.images.length}
				<div class="mt-4 grid grid-cols-3 items-center justify-center gap-2">
					{#each day.images as entry}
						<a
							data-fslightbox="gallery"
							data-type="image"
							href={`${PUBLIC_DIRECTUS_URL}/assets/${entry.image}`}
						>
							<AspectRatio ratio={1} class="bg-muted">
								<img
									src={`${PUBLIC_DIRECTUS_URL}/assets/${entry.image}?height=512&width=512&quality=75`}
									alt={entry.description}
									loading="lazy"
									class="h-full w-full rounded-xl object-cover"
								/>
							</AspectRatio>
						</a>
					{/each}
				</div>
			{/if}

			<div class="mt-4">
				<Button
					variant="outline"
					data-fslightbox="maps"
					data-class="!block"
					href={`#map-${day.id}`}
				>
					📍 Karte anzeigen
				</Button>
				<iframe
					id={`map-${day.id}`}
					title={`Karte für ${day.title}`}
					width="1080px"
					height="1080px"
					scrolling="no"
					allow="autoplay; fullscreen"
					allowFullScreen
					src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBdanO51ibHQTi0fFcyug3upt2I3SqCVVI&zoom=8&q=${latitude},${longitude}`}
					class="hidden"
				></iframe>
			</div>
		</li>
	{/each}
</ul>
