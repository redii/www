<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Badge } from '$lib/components/ui/badge';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import Form from '$lib/components/form.svelte';
	import Trash from '@lucide/svelte/icons/trash';

	import { env } from '$env/dynamic/public';

	export let data;
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">ITADM Server</h1>

<p class="leading-7 [&:not(:first-child)]:mt-6">
	Übersicht aller aktiven DigitalOcean Droplets für den ITADM Kurs.
</p>

<div class="mt-8 flex flex-row justify-end">
	<Dialog.Root>
		<Dialog.Trigger
			class={buttonVariants({ variant: 'destructive' })}
			disabled={data.servers.length === 0}
		>
			<Trash />
			Server löschen
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>ITADM Server löschen</Dialog.Title>
				<Dialog.Description>
					Sollen wirklich alle ITADM Server gelöscht werden? Dies kann nicht rückgängig gemacht
					werden.
				</Dialog.Description>
			</Dialog.Header>
			<Form action="?/deleteDroplets" method="POST">
				<Button type="submit" variant="destructive" class="w-full">
					<Trash class="mr-1 inline" size={24} />
					Alle Server löschen
				</Button>
			</Form>
		</Dialog.Content>
	</Dialog.Root>
</div>

<Card.Root class="mt-4 p-0">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Server</Table.Head>
				<Table.Head>IP-Adresse</Table.Head>
				<Table.Head>Benutzer</Table.Head>
				<Table.Head>Password</Table.Head>
				<Table.Head>Claim Code</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#if data.servers.length === 0}
				<Table.Row>
					<Table.Cell colspan={6} class="text-center text-muted-foreground">
						Keine Server gefunden
					</Table.Cell>
				</Table.Row>
			{:else}
				{#each data.servers as server}
					{@const claimCode = server.tags.find((t: string) => t !== 'itadm')}
					<Table.Row>
						<Table.Cell class="font-medium">{server.name}</Table.Cell>
						<Table.Cell>
							{server.networks.v4.find((a: any) => !a.ip_address.startsWith('10.'))?.ip_address}
						</Table.Cell>
						<Table.Cell>root</Table.Cell>
						<Table.Cell>{env.PUBLIC_DO_VPS_PASSWORD}</Table.Cell>
						<Table.Cell>
							{#if claimCode}
								<Badge variant="secondary" class="font-mono">
									{claimCode}
								</Badge>
							{:else}
								<Badge variant="outline">Frei</Badge>
							{/if}
						</Table.Cell>
					</Table.Row>
				{/each}
			{/if}
		</Table.Body>
	</Table.Root>
</Card.Root>
