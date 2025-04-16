<script lang="ts">
	import { Mail, Github, Linkedin } from '@lucide/svelte';
</script>

<footer>
	<div
		class="mx-auto flex h-[256px] max-w-4xl flex-col items-center justify-center gap-8 lg:h-[128px] lg:flex-row lg:justify-between lg:px-8"
	>
		<div class="flex justify-center gap-x-6 md:order-3">
			<a
				href="https://www.linkedin.com/in/hakmann/"
				target="_blank"
				class="rounded-full p-2 text-muted-foreground duration-200 hover:bg-muted hover:text-gray-800"
			>
				<span class="sr-only">Linkedin</span>
				<Linkedin />
			</a>
			<a
				href="https://github.com/redii"
				target="_blank"
				class="rounded-full p-2 text-muted-foreground duration-200 hover:bg-muted hover:text-gray-800"
			>
				<span class="sr-only">GitHub</span>
				<Github />
			</a>
			<a
				href="mailto:moin@akmann.dev"
				class="rounded-full p-2 text-muted-foreground duration-200 hover:bg-muted hover:text-gray-800"
			>
				<span class="sr-only">Email</span>
				<Mail />
			</a>
		</div>
		<p class="text-center text-sm/6 text-gray-600 md:order-1">
			Henry Akmann {new Date().getFullYear()}
		</p>
		<a
			href="/posts/hello-world"
			class="block text-center text-sm/6 text-muted-foreground hover:text-gray-800 md:order-2"
		>
			Made with ❤️
		</a>
	</div>
</footer>
