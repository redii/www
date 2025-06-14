<script lang="ts">
	import PageList from '$lib/components/page-list.svelte';
	import Gmaps from '$lib/components/gmaps.svelte';
	import LightboxItem from '$lib/components/lightbox/LightboxItem.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import MapPinned from '@lucide/svelte/icons/map-pinned';

	export let data;
</script>

<div class="mb-6 flex flex-row items-center justify-between gap-4">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Urlaube</h1>
	<div class="sm:hidden">
		<LightboxItem gallery="overview">
			<Button variant="secondary" size="icon">
				<MapPinned />
				<span class="sr-only">Übersichtskarte anzeigen</span>
			</Button>
			{#snippet lightboxContent()}
				<Gmaps
					location={{ lat: 20, lng: 0 }}
					zoom={1.7}
					markers={data.vacations.map((v) => {
						if (v.location)
							return {
								lat: v.location.coordinates[1],
								lng: v.location.coordinates[0],
								href: `/vacations/${v.id}`
							};
					})}
					class="mx-auto h-[60vh] w-96"
				/>
			{/snippet}
		</LightboxItem>
	</div>
</div>

<div class="mb-12 hidden sm:block">
	<Gmaps
		location={{ lat: 20, lng: 0 }}
		zoom={1.7}
		markers={data.vacations.map((v) => {
			if (v.location)
				return {
					lat: v.location.coordinates[1],
					lng: v.location.coordinates[0],
					href: `/vacations/${v.id}`
				};
		})}
		class="h-96 w-full rounded-2xl border bg-muted-foreground"
	/>
</div>

<PageList
	pages={data.vacations.map((v) => {
		const startDate = new Date(v.start_date);
		const vacationMonth = startDate.toLocaleString('de', { month: 'long' });
		const vacationYear = startDate.getFullYear();
		return {
			title: v.title,
			href: `/vacations/${v.id}`,
			date: `${vacationMonth} ${vacationYear}`,
			imageId: v.image
		};
	})}
/>
