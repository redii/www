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

<style>
	:global(.signInButton button) {
		@apply inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-8 text-sm font-medium whitespace-nowrap text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0;
	}
</style>
