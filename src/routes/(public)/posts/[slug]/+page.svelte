<script lang="ts">
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	export let data;
</script>

{#if data.post?.image}
	<img
		class="mb-12 w-full rounded-2xl border border-foreground/10 bg-muted object-contain object-center shadow-sm md:mb-16"
		src={`${PUBLIC_DIRECTUS_URL}/assets/${data.post.image}`}
		alt={data.post.title}
	/>
{/if}

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{data.post?.title}</h1>
<time
	datetime={data.post?.date}
	class="mt-4 inline-block text-sm leading-none font-medium text-muted-foreground"
>
	{data.post?.date}
</time>

<article class="prose mt-12 max-w-full lg:prose-lg dark:prose-invert">
	{@html data.html.code}
</article>
