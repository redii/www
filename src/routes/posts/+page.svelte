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
			<Breadcrumb.Page>Blog</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Blog Posts</h1>

<p class="mb-12 leading-7 [&:not(:first-child)]:mt-6">
	Wenn ich mal was zu berichten habe, könnte es sein, dass hier ein Post erscheint.
</p>

<PageList
	pages={data.posts.map((p) => {
		return {
			title: p.title,
			href: `/posts/${p.slug}`,
			date: p.date,
			description: p.description,
			image: p.image
		};
	})}
/>
