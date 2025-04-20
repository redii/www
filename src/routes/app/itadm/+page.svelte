<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';

	import { PUBLIC_DO_VPS_PASSWORD } from '$env/static/public';

	export let data;
</script>

<Card.Root class="Root">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Server</Table.Head>
				<Table.Head>IP-Adresse</Table.Head>
				<Table.Head>Benutzer</Table.Head>
				<Table.Head>Password</Table.Head>
				<Table.Head>Claim Code</Table.Head>
				<Table.Head class="text-right"></Table.Head>
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
					<Table.Row>
						<Table.Cell class="font-medium">{server.name}</Table.Cell>
						<Table.Cell>
							{server.networks.v4.find((a) => !a.ip_address.startsWith('10.'))?.ip_address}
						</Table.Cell>
						<Table.Cell>root</Table.Cell>
						<Table.Cell>{PUBLIC_DO_VPS_PASSWORD}</Table.Cell>
						<Table.Cell>
							<Badge variant="secondary" class="font-mono">
								{server.tags.find((t) => t !== 'itadm')}
							</Badge>
						</Table.Cell>
						<Table.Cell class="text-right"></Table.Cell>
					</Table.Row>
				{/each}
			{/if}
		</Table.Body>
	</Table.Root>
</Card.Root>
