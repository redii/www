<script lang="ts">
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	interface Props {
		pages: {
			title: string;
			href: string;
			date: string;
			description?: string;
			image?: string;
			imageId?: string;
		}[];
	}

	let { pages }: Props = $props();
</script>

{#if pages.length}
	<section>
		<div class="grid auto-rows-fr grid-cols-1 gap-8 sm:gap-12">
			{#each pages as page}
				<article
					class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-zinc-900 px-8 py-8"
					class:pt-56={page.image || page.imageId}
					class:sm:pt-40={page.image || page.imageId}
				>
					{#if page.image || page.imageId}
						<img
							src={page.image
								? page.image
								: `${PUBLIC_DIRECTUS_URL}/assets/${page.imageId}?width=1024&quality=75`}
							alt={page.title}
							class="absolute inset-0 -z-10 size-full object-cover"
						/>
					{/if}
					<div class="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40"></div>
					<div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-zinc-900/10"></div>

					<h3 class="text-3xl font-semibold tracking-tight text-white transition-colors">
						<a href={page.href}>
							<span class="absolute inset-0"></span>
							{page.title}
						</a>
					</h3>
					{#if page.description}
						<p class="mt-2 leading-7 text-muted dark:text-muted-foreground">{page.description}</p>
					{/if}
					<time
						datetime={page.date}
						class="mt-1 text-sm/6 !font-light text-muted dark:text-muted-foreground"
					>
						{page.date.split('T')[0]}
					</time>
				</article>
			{/each}
		</div>
	</section>
{/if}
