<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import LightboxItem from '$lib/components/lightbox/LightboxItem.svelte';
	import Gmaps from '$lib/components/gmaps.svelte';
	import Share2 from '@lucide/svelte/icons/share-2';
	import MapPinned from '@lucide/svelte/icons/map-pinned';

	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	interface Props {
		vacation: any;
		vacationDays: any[];
		vacationPassword?: string;
	}

	let { vacation, vacationDays, vacationPassword }: Props = $props();

	const startDate = new Date(vacation.start_date);
	const vacationMonth = startDate.toLocaleString('de', { month: 'long' });
	const vacationYear = startDate.getFullYear();
</script>

<svelte:head>
	<title>
		{vacation.title} ·
		{vacationMonth}
		{vacationYear}
	</title>
</svelte:head>

{#if vacation.image}
	<img
		src={`${PUBLIC_DIRECTUS_URL}/assets/${vacation.image}?format=webp&width=1024`}
		alt={vacation.title}
		class="h-80 w-full rounded-2xl border border-foreground/10 bg-muted object-cover object-center shadow-sm sm:h-[400px]"
	/>
{/if}

<section id="vacation-heading" class="mt-8 mb-16">
	<div class="flex flex-col items-start justify-between gap-4 sm:flex-row">
		<div>
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{vacation.title}
			</h1>
			<time datetime={vacation.start_date} class="mt-1 block text-lg md:mt-2">
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
					url.searchParams.set('password', vacationPassword || '');
					if (navigator.share) {
						await navigator.share({
							title: `${vacation.title} · ${vacationMonth} ${vacationYear}`,
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
			<LightboxItem gallery={`locations-${vacation.id}`}>
				<Button variant="secondary" size="icon" class="size-12">
					<MapPinned class="size-5" />
					<span class="sr-only">Übersichtskarte anzeigen</span>
				</Button>
				{#snippet lightboxContent()}
					<Gmaps
						location={{
							lat: vacation.location.coordinates[1],
							lng: vacation.location.coordinates[0]
						}}
						zoom={vacation.location_zoom}
						markers={vacationDays.map((vd) => {
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
