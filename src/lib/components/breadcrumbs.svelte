<script lang="ts">
	import { page } from '$app/state';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import House from '@lucide/svelte/icons/house';
</script>

{#if page.url.pathname !== '/' && page.data.hideBreadcrumbs !== true && !page.error}
	<Breadcrumb.Root class="mb-8">
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">
					<House size={16} />
				</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			{#each page.url.pathname.split('/').slice(1) as slug, index}
				{@const itemUrl = '/' + [...page.url.pathname.split('/').slice(1, index + 2)].join('/')}
				{@const isLastItem = index === page.url.pathname.split('/').length - 2}
				{#if isLastItem}
					<Breadcrumb.Page>{page.data.title || slug}</Breadcrumb.Page>
				{:else}
					<Breadcrumb.Item>
						<Breadcrumb.Link href={itemUrl}>{slug}</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
				{/if}
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
{/if}
