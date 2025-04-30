<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import Form from '$lib/components/form.svelte';
</script>

<div class="mx-auto max-w-lg">
	<Card.Root>
		<Card.Content>
			<Form method="POST" action="/vacations/password">
				<div class="mb-3 flex flex-col gap-1.5">
					<Label for="password">Passwort</Label>
					<Input type="password" id="password" name="password" />
				</div>
				<Button type="submit" class="w-full">Speichern</Button>
			</Form>
		</Card.Content>
	</Card.Root>
</div>
