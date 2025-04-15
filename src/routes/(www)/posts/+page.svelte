<script lang="ts">
	export let data;
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Posts</h1>

<p class="leading-7 [&:not(:first-child)]:mt-6">
	Wenn ich mal was zu berichten habe, könnte es sein, dass hier ein Post erscheint.
</p>

<div class="mt-16 grid auto-rows-fr grid-cols-1 gap-8">
	{#each data.posts as post}
		<article
			class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48"
		>
			<img
				src={post.image}
				alt={post.title}
				class="absolute inset-0 -z-10 size-full object-cover"
			/>
			<div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
			<div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

			<div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-muted">
				<time datetime={post.date}>
					{new Date(post.date).toLocaleDateString('de')}
				</time>
			</div>
			<h2 class="mt-1 text-3xl font-semibold tracking-tight text-white transition-colors">
				<a href={`/posts/${post.slug}`}>
					<span class="absolute inset-0"></span>
					{post.title}
				</a>
			</h2>
			<p class="mt-2 leading-7 text-muted">{post.description}</p>
		</article>
	{/each}
</div>
