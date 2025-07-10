<script lang="ts">
	import { page } from '$app/state';
	import * as Alert from '$lib/components/ui/alert';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';
	import Form from '$lib/components/form.svelte';
	import PageList from '$lib/components/page-list.svelte';
	import Terminal from '@lucide/svelte/icons/terminal';
	import Lock from '@lucide/svelte/icons/lock';
	import Unplug from '@lucide/svelte/icons/unplug';
	import { PUBLIC_DO_VPS_PASSWORD } from '$env/static/public';

	export let data;

	let confirmDropletDisconnect = false;
</script>

<svelte:head>
	<title>Henry Akmann · {data.page.title}</title>
</svelte:head>

{#if data.droplet}
	<Alert.Root class="mb-12 flex-row items-center justify-between shadow-sm lg:flex">
		<Alert.Title class="flex flex-row items-center gap-2 lg:mb-0">
			<div
				class={`inline-block rounded-full p-[4px] ${data.droplet.status !== 'active' ? 'bg-red-500/40' : 'bg-green-500/40'}`}
			>
				<div
					class="rounded-full bg-green-500 p-[4px]"
					class:bg-red-500={data.droplet.status !== 'active'}
				></div>
			</div>
			{data.droplet.name}
		</Alert.Title>
		<Alert.Description class="font-mono text-muted-foreground">
			{data.droplet.ipv4} ·
			{data.droplet.region} ·
			{data.droplet.size} ·

			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Badge variant="secondary">{data.droplet.claimCode}</Badge>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p class="text-xs">Der Claim Code deines Servers</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>

			<Dialog.Root>
				<Dialog.Trigger class="duration-200 hover:text-foreground">
					<Lock size={14} class="relative top-1 ml-1" />
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Zugangsdaten</Dialog.Title>
						<Dialog.Description>
							Nutze die folgenden Zugangsdaten, um dich mit dem Server zu verbinden:
						</Dialog.Description>
					</Dialog.Header>
					<div class="flex flex-col gap-1.5">
						<Label for="droplet-ip-address">IP-Adresse</Label>
						<Input type="text" id="droplet-ip-address" readonly value={data.droplet?.ipv4} />
					</div>
					<div class="flex flex-col gap-1.5">
						<Label for="droplet-user">Benutzer</Label>
						<Input type="text" id="droplet-user" readonly value="root" />
					</div>
					<div class="flex flex-col gap-1.5">
						<Label for="droplet-password">Password</Label>
						<Input type="text" id="droplet-password" readonly value={PUBLIC_DO_VPS_PASSWORD} />
					</div>
					<div class="flex flex-col gap-1.5">
						<Label for="droplet-ssh-command">Verbinden per SSH</Label>
						<code class="relative rounded bg-muted px-3 py-2 font-mono text-sm font-semibold">
							{`ssh root@${data.droplet?.ipv4}`}
						</code>
					</div>
				</Dialog.Content>
			</Dialog.Root>

			<Dialog.Root>
				<Dialog.Trigger class="duration-200 hover:text-red-500">
					<Unplug size={14} class="relative top-1 ml-1" />
				</Dialog.Trigger>
				<Dialog.Content>
					<Form action="/itadm/claim?/disconnectDroplet" method="POST" class="inline">
						<Dialog.Header>
							<Dialog.Title>Server trennen</Dialog.Title>
							<Dialog.Description>
								Durch das Trennen wird dir der Server hier nicht mehr angezeigt, er bleibt aber
								weiterhin in der Cloud bestehen.
								<br /><br />
								Notiere dir den Claim Code
								<Badge variant="secondary" class="font-mono">{data.droplet.claimCode}</Badge>
								anhand dessen du ihn wieder verbinden kannst.
							</Dialog.Description>
						</Dialog.Header>
						<div class="flex items-center space-x-2 py-6">
							<Switch id="are-you-sure" bind:checked={confirmDropletDisconnect} />
							<Label for="are-you-sure">Bist du sicher?</Label>
						</div>
						<Dialog.Footer>
							<Button
								variant="destructive"
								type="submit"
								class="w-full"
								disabled={!confirmDropletDisconnect}
							>
								Server trennen
							</Button>
						</Dialog.Footer>
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
		class="mb-12 w-full rounded-2xl border border-foreground/10 bg-muted object-contain md:mb-16"
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

<article class="prose my-12 max-w-full dark:prose-invert lg:prose-lg">
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
