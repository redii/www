<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import PageList from '$lib/components/PageList.svelte';
	import { House } from 'lucide-svelte';

	export let data;
</script>

<svelte:head>
	<title>Henry Akmann · {data.page.title}</title>
</svelte:head>

<section>
	<Breadcrumb.Root class="mb-8">
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">
					<House size={16} />
				</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			{#if data.path.length}
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/itadm">itadm</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
			{:else}
				<Breadcrumb.Item>
					<Breadcrumb.Page>itadm</Breadcrumb.Page>
				</Breadcrumb.Item>
			{/if}
			{#each data.path as item, index}
				{@const itemUrl = '/itadm/' + [...data.path.slice(0, index), item].join('/')}
				{@const isLastItem = index === data.path.length - 1}
				{#if isLastItem}
					<Breadcrumb.Page>{item}</Breadcrumb.Page>
				{:else}
					<Breadcrumb.Item>
						<Breadcrumb.Link href={itemUrl}>{item}</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
				{/if}
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>

	{#if data.page.image}
		<img
			class="mb-12 w-full rounded-2xl border border-gray-200 object-contain md:mb-16"
			src={`https://cms.akmann.dev/assets/${data.page.image}`}
			alt={data.page.title}
		/>
	{/if}

	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		{data.page.title}
	</h1>
	<time
		datetime={data.page.date_updated}
		class="mt-4 inline-block text-sm font-medium leading-none text-muted-foreground"
	>
		Letztes Update am {new Date(data.page.date_updated).toLocaleDateString('de')}
	</time>
</section>

<article class="prose my-12 max-w-full lg:prose-lg">
	{@html data.html.code
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>')}
</article>

<PageList
	pages={data.page.childs.map((c) => {
		return {
			title: c.title,
			href: '/itadm/' + [...data.path, c.slug].join('/'),
			date: c.date_updated,
			description: c.description,
			image: c.image
		};
	})}
/>
