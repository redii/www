<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
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
			class="mb-12 w-full rounded-2xl border border-gray-200 object-contain md:mb-20"
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

<article class="prose lg:prose-lg my-12 max-w-full">
	{@html data.html.code
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>')}
</article>

{#if data.page.childs}
	<section>
		<h2 class="sr-only">Beiträge</h2>
		<div class="grid auto-rows-fr grid-cols-1 gap-8">
			{#each data.page.childs as child}
				{@const childPath = [...data.path, child.slug].join('/')}
				<article
					class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-64 sm:pt-40"
				>
					{#if child.image}
						<img
							src={`https://cms.akmann.dev/assets/${child.image}`}
							alt={child.title}
							class="absolute inset-0 -z-10 size-full object-cover"
						/>
					{/if}
					<div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
					<div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

					<div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-muted">
						<time datetime={child.date_updated}>
							{new Date(child.date_updated).toLocaleDateString('de')}
						</time>
					</div>
					<h3 class="mt-1 text-3xl font-semibold tracking-tight text-white transition-colors">
						<a href={`/itadm/${childPath}`}>
							<span class="absolute inset-0"></span>
							{child.title}
						</a>
					</h3>
					{#if child.description}
						<p class="mt-2 leading-7 text-muted">{child.description}</p>
					{/if}
				</article>
			{/each}
		</div>
	</section>
{/if}

<style>
	:global(details > summary) {
		font-size: 90%;
		font-weight: 600;
		cursor: pointer;
		margin-bottom: 1rem;
	}

	:global(details > summary::-webkit-details-marker) {
		display: none;
	}

	:global(details div:first-of-type) {
		font-size: 90%;
		@apply rounded-lg border bg-card p-6 text-card-foreground shadow-sm;
	}
</style>
