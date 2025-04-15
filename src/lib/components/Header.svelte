<script lang="ts">
	import { Menu, X, Github, Mail } from '@lucide/svelte';

	let mobileMenuOpen = $state(false);
</script>

<header class="sticky top-0 border-b border-gray-200">
	<nav
		class="sticky top-0 mx-auto flex h-[64px] max-w-4xl items-center justify-between bg-background/75 px-6 backdrop-blur lg:px-8"
		aria-label="Global"
	>
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">Henry Akmann</span>
				<img src="/images/tilde.svg" alt="Akmann Tilde Emblem" class="w-10" />
			</a>
		</div>
		<div class="flex lg:hidden">
			<button
				type="button"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			>
				<span class="sr-only">Menü öffnen</span>
				<Menu />
			</button>
		</div>
		<div class="hidden lg:flex lg:flex-1 lg:justify-end">
			<a
				href="https://github.com/redii"
				class="rounded-full p-2 text-gray-900 duration-200 hover:bg-muted"
			>
				<Github />
			</a>
			<a
				href="mailto:moin@akmann.dev"
				class="rounded-full p-2 text-gray-900 duration-200 hover:bg-muted"
			>
				<Mail />
			</a>
		</div>
	</nav>

	<!-- Mobile menu, show/hide based on menu open state. -->
	<div class="lg:hidden" class:hidden={!mobileMenuOpen} role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="fixed inset-0 z-10"></div>
		<div
			class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-5 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
		>
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5 sm:invisible">
					<span class="sr-only">Henry Akmann</span>
					<img src="/images/tilde.svg" alt="Akmann Tilde Emblem" class="w-10" />
				</a>
				<button
					type="button"
					class="-m-2.5 rounded-md p-2.5 text-gray-700"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				>
					<span class="sr-only">Menü schließen</span>
					<X />
				</button>
			</div>
			<div class="mt-6 flow-root">
				<div class="flex flex-col items-center gap-6 py-6">
					<a
						href="https://github.com"
						class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-gray-900 hover:bg-gray-50"
					>
						<Github class="mr-2 inline" size={24} />
						Github
					</a>
					<a
						href="moin@akmann.dev"
						class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-gray-900 hover:bg-gray-50"
					>
						<Mail class="mr-2 inline" size={24} />
						Email
					</a>
				</div>
			</div>
		</div>
	</div>
</header>
