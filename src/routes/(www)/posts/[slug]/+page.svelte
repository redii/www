<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { House } from 'lucide-svelte';

	export let data;
</script>

<section>
	<Breadcrumb.Root class="mb-8">
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">
					<House size={16} />
				</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/posts">Blog</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>{data.meta.slug}</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	{#if data.meta.image}
		<img
			class="mb-12 w-full rounded-2xl border border-gray-200 object-contain md:mb-16"
			src={data.meta.image}
			alt={data.meta.title}
		/>
	{/if}

	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{data.meta.title}</h1>
	<time
		datetime={data.meta.date}
		class="mt-4 inline-block text-sm font-medium leading-none text-muted-foreground"
	>
		{new Date(data.meta.date).toLocaleDateString('de')}
	</time>
</section>

<article class="prose mt-12 max-w-full lg:prose-lg">
	{@html data.content}
</article>
