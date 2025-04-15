<script lang="ts">
	import { Mail, Github, Linkedin } from '@lucide/svelte';
</script>

<footer class="bg-white">
	<div
		class="mx-auto h-[192px] max-w-4xl md:flex md:items-center md:justify-between lg:h-[128px] lg:px-8"
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
		<a
			href="/posts/hello-world"
			class="mt-8 block text-center text-sm/6 text-muted-foreground hover:text-gray-800 md:order-2 md:mt-0"
		>
			Made with ❤️
		</a>
		<p class="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0">
			Henry Akmann {new Date().getFullYear()}
		</p>
	</div>
</footer>
