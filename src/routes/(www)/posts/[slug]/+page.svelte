<script lang="ts">
	export let data;
</script>

<section>
	{#if data.meta.image}
		<img
			class="mb-12 h-64 w-full rounded-2xl object-cover md:mb-20 lg:h-80"
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

<article class="prose lg:prose-lg mt-12 max-w-full">
	{@html data.content}
</article>
