<script lang="ts">
	import PageList from '$lib/components/PageList.svelte';

	export let data;
</script>

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
