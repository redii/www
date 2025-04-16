<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import PageList from '$lib/components/PageList.svelte';
	import { House } from 'lucide-svelte';

	export let data;
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
			<Breadcrumb.Page>Urlaube</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>

<h1 class="mb-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Urlaube</h1>

<PageList
	pages={data.vacations.map((v) => {
		return {
			title: v.title,
			href: `/vacations/${v.id}`,
			date: v.start_date,
			image: v.image
		};
	})}
/>
