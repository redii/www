<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Mail, Github, Linkedin } from '@lucide/svelte';
</script>

<footer>
	<div
		class="mx-auto flex h-[256px] max-w-4xl flex-col items-center justify-center gap-8 lg:h-[128px] lg:flex-row lg:justify-between lg:px-8"
	>
		<div class="flex justify-center gap-x-4 md:order-3">
			<Button
				href="https://www.linkedin.com/in/hakmann"
				target="_blank"
				variant="ghost"
				size="icon"
			>
				<span class="sr-only">Linkedin</span>
				<Linkedin />
			</Button>
			<Button href="https://github.com/redii" target="_blank" variant="ghost" size="icon">
				<span class="sr-only">GitHub</span>
				<Github />
			</Button>
			<Button href="mailto:henry@akmann.dev" variant="ghost" size="icon">
				<span class="sr-only">Email</span>
				<Mail />
			</Button>
		</div>
		<p class="text-center text-sm/6 text-muted-foreground md:order-1">
			Henry Akmann {new Date().getFullYear()}
		</p>
		<a
			href="/posts/hello-world"
			class="block text-center text-sm/6 text-muted-foreground hover:text-foreground md:order-2"
		>
			Made with ❤️
		</a>
	</div>
</footer>
