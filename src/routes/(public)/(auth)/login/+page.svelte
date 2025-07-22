<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title>Login</Card.Title>
		<Card.Description>Du kannst dich mit einem Github Account hier anmelden.</Card.Description>
	</Card.Header>
	<Card.Content>
		<SignIn
			provider="github"
			signInPage="login"
			options={{ redirectTo: '/app', scope: 'read:user' }}
		/>
	</Card.Content>
</Card.Root>
