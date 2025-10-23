<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title>Login</Card.Title>
		<Card.Description>Du kannst dich mit einem Github Account hier anmelden.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" action="/login">
			<input type="hidden" name="providerId" value="github" />
			<input type="hidden" name="callbackUrl" value="/app" />
			<input type="hidden" name="redirect" value="/app" />
			<input type="hidden" name="redirectTo" value="/app" />
			<Button type="submit" class="w-full">Einloggen mit Github</Button>
		</form>
	</Card.Content>
</Card.Root>
