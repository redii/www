<script lang="ts">
	import PageList from '$lib/components/page-list.svelte';

	export let data;
</script>

<h1 class="mb-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Urlaube</h1>

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
