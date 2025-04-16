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
					class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-56 sm:pt-40"
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
					<div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
					<div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

					<div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-muted">
						<time datetime={page.date}>
							{new Date(page.date).toLocaleDateString('de')}
						</time>
					</div>
					<h3 class="mt-1 text-3xl font-semibold tracking-tight text-white transition-colors">
						<a href={page.href}>
							<span class="absolute inset-0"></span>
							{page.title}
						</a>
					</h3>
					{#if page.description}
						<p class="mt-2 leading-7 text-muted">{page.description}</p>
					{/if}
				</article>
			{/each}
		</div>
	</section>
{/if}
