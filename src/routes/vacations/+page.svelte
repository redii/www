<script lang="ts">
	import PageList from '$lib/components/PageList.svelte';

	export let data;
</script>

<h1 class="mb-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Urlaube</h1>

<PageList
	pages={data.vacations.map((v) => {
		return {
			title: v.title,
			href: `/vacations/${v.id}`,
			date: v.start_date,
			imageId: v.image
		};
	})}
/>
