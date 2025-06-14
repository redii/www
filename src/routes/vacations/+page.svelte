<script lang="ts">
	import PageList from '$lib/components/page-list.svelte';
	import Gmaps from '$lib/components/gmaps.svelte';

	export let data;
</script>

<h1 class="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Urlaube</h1>

<div class="mb-12">
	<div class="sm:hidden">
		<Gmaps
			variant="grayscale"
			location={{ lat: 20, lng: 10 }}
			zoom={0.6}
			markers={data.vacations.map((v) => {
				if (v.location)
					return {
						lat: v.location.coordinates[1],
						lng: v.location.coordinates[0],
						href: `/vacations/${v.id}`
					};
			})}
			class="h-48 w-full rounded-2xl border"
		/>
	</div>
	<div class="hidden sm:block">
		<Gmaps
			variant="grayscale"
			location={{ lat: 20, lng: 10 }}
			zoom={1.7}
			markers={data.vacations.map((v) => {
				if (v.location)
					return {
						lat: v.location.coordinates[1],
						lng: v.location.coordinates[0],
						href: `/vacations/${v.id}`
					};
			})}
			class="h-96 w-full rounded-2xl border"
		/>
	</div>
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
