<script lang="ts">
	import { page } from '$app/state';
	import * as Alert from '$lib/components/ui/alert';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import Form from '$lib/components/Form.svelte';
	import PageList from '$lib/components/PageList.svelte';
	import { Terminal, Unplug } from 'lucide-svelte';

	export let data;
</script>

<svelte:head>
	<title>Henry Akmann · {data.page.title}</title>
</svelte:head>

{#if data.droplet}
	<Alert.Root class="mb-12 flex-row justify-between shadow-sm lg:flex">
		<Alert.Title>
			<div
				class="relative top-0.5 mr-1 inline-block rounded-full border border-4 border-green-200 bg-green-500 p-[0.25rem]"
				class:border-red-200={data.droplet.status !== 'active'}
				class:bg-red-500={data.droplet.status !== 'active'}
			></div>
			{data.droplet.name}
		</Alert.Title>
		<Alert.Description class="text-muted-foreground">
			<span class="font-mono">{data.droplet.ipv4}</span> &nbsp;·&nbsp;
			<span class="font-mono">{data.droplet.region}</span> &nbsp;·&nbsp;
			<span class="font-mono">{data.droplet.size}</span> &nbsp;·&nbsp;
			<Badge variant="secondary" class="font-mono">{data.droplet.claimCode}</Badge>
			<Dialog.Root>
				<Dialog.Trigger class="duration-200 hover:text-red-500">
					<Unplug size={14} class="relative top-1 ml-1" />
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Server wirklich trennen?</Dialog.Title>
						<Dialog.Description>
							Dadurch wird dir der Server hier nicht mehr angezeigt, er bleibt aber weiterhin in der
							Cloud bestehen. Du kannst ihn später anhand des Claim Codes
							<Badge variant="secondary" class="font-mono">{data.droplet.claimCode}</Badge> wieder verknüpfen.
						</Dialog.Description>
					</Dialog.Header>
					<Form action="/itadm/claim?/disconnectDroplet" method="POST" class="inline">
						<Button type="submit" class="w-full">Server trennen</Button>
					</Form>
				</Dialog.Content>
			</Dialog.Root>
		</Alert.Description>
	</Alert.Root>
{:else if data.totalDropletsCount}
	<Alert.Root class="mb-12">
		<Terminal class="size-4" />
		<Alert.Title>Einen Server anfordern</Alert.Title>
		<Alert.Description class="text-muted-foreground">
			Du kannst einen Server anfordern, um damit die Aufgaben im ITADM Kurs zu bearbeiten.<br />
			Es sind aktuell {data.freeDropletsCount} von {data.totalDropletsCount} Server verfügbar.
		</Alert.Description>
		<div class="mt-2">
			<Button variant="secondary" href="/itadm/claim">Jetzt Server anfordern</Button>
		</div>
	</Alert.Root>
{/if}

{#if data.page.image}
	<img
		class="mb-12 w-full rounded-2xl border border-gray-200 object-contain md:mb-16"
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

<article class="prose my-12 max-w-full lg:prose-lg">
	{@html data.html.code
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>')}
</article>

<PageList
	pages={data.page.childs.map((c) => {
		return {
			title: c.title,
			href: `${page.url.pathname}/${c.slug}`,
			date: c.date_updated,
			description: c.description,
			imageId: c.image
		};
	})}
/>
