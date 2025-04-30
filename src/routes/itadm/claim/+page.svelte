<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Form from '$lib/components/form.svelte';
	import { PUBLIC_DO_VPS_PASSWORD } from '$env/static/public';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<div class="mx-auto max-w-lg">
	<Button variant="ghost" class="mb-4" onclick={() => window.history.back()}>
		<span aria-hidden="true">&larr;</span>
		Zurück
	</Button>

	{#if form?.success}
		<Card.Root>
			<Card.Header>
				<Card.Title>✅&nbsp; Server zugewiesen</Card.Title>
				<Card.Description>
					Ein Server wurde dir erfolgreich zugewiesen! Du kannst ihn jetzt für die Aufgaben im ITADM
					Kurs benutzen.
				</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4 md:grid-cols-2">
				<div class="flex flex-col gap-1.5">
					<Label for="droplet-name">Servername</Label>
					<Input type="text" id="droplet-name" readonly value={form.droplet?.name} />
				</div>
				<div class="flex flex-col gap-1.5">
					<Label for="droplet-ip-address">IP-Adresse</Label>
					<Input type="text" id="droplet-ip-address" readonly value={form.droplet?.ipv4} />
				</div>
				<div class="flex flex-col gap-1.5">
					<Label for="droplet-username">Benutzer</Label>
					<Input type="text" id="droplet-username" readonly value="root" />
				</div>
				<div class="flex flex-col gap-1.5">
					<Label for="droplet-password">Passwort</Label>
					<Input type="text" id="droplet-password" readonly value={PUBLIC_DO_VPS_PASSWORD} />
				</div>
			</Card.Content>
		</Card.Root>
	{:else}
		<Card.Root>
			<Card.Header>
				<Card.Title>Einen Server anfragen</Card.Title>
				<Card.Description>
					Hier kannst du einen Server anfragen, um die Aufgaben im ITADM Kurs damit zu bearbeiten.
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<Form action="/itadm/claim?/claimDroplet" method="POST">
					<Button type="submit" class="w-full">Server anfragen</Button>
				</Form>
				<Dialog.Root>
					<Dialog.Trigger class="mt-2 w-full text-center">
						<Button variant="link">Du hast einen Claim Code?</Button>
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Server neu verknüpfen</Dialog.Title>
							<Dialog.Description>
								Wenn dein Server hier nicht mehr angezeigt wird, kannst du ihn hier neu verknüpfen.
								Bitte gib deinen Claim Code ein, um den Server zu verknüpfen.
							</Dialog.Description>
						</Dialog.Header>
						<Form action="/itadm/claim?/claimDroplet" method="POST">
							<div class="mb-3 flex flex-col gap-1.5">
								<Label for="claim-code">Claim Code</Label>
								<Input type="text" id="claim-code" name="claimCode" required />
							</div>
							<Button type="submit" class="w-full">Server verknüpfen</Button>
						</Form>
					</Dialog.Content>
				</Dialog.Root>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
