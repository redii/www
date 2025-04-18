<script lang="ts">
	import { page } from '$app/state';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Menu, X, Github, Mail, LogIn, LogOut } from '@lucide/svelte';

	let mobileMenuOpen = $state(false);
</script>

<header class="sticky top-0 z-50 border-b border-gray-200 bg-background/75">
	<nav
		class="sticky top-0 mx-auto flex h-[64px] max-w-4xl items-center justify-between px-6 backdrop-blur lg:px-8"
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
		<div class="hidden gap-2 lg:flex lg:flex-1 lg:justify-end">
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
			{#if page?.data?.session}
				{@const user = page?.data?.session?.user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="ml-2">
						<Avatar.Root>
							<Avatar.Image
								src={page?.data?.session?.user?.image}
								alt={page?.data?.session?.user?.name}
							/>
							<Avatar.Fallback>
								{user?.name?.split(' ')[0].split('')[0]}{user?.name?.split(' ')[1].split('')[0]}
							</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								<a href="/app">Dashboard</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<form action="/logout" method="POST">
									<button type="submit">Logout</button>
								</form>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button variant="secondary" href="/login" class="ml-2">Einloggen</Button>
			{/if}
		</div>
	</nav>

	<!-- Mobile menu, show/hide based on menu open state. -->
	<div class="lg:hidden" class:hidden={!mobileMenuOpen} role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="z-60 fixed inset-0"></div>
		<div
			class="z-60 fixed inset-y-0 right-0 w-full overflow-y-auto bg-white px-6 py-5 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
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
				<div class="flex min-h-96 flex-col items-center justify-center gap-6 py-6">
					{#if page?.data?.session}
						{@const user = page?.data?.session?.user}
						<div class="mb-12 flex flex-row items-center gap-3">
							<Avatar.Root class="h-24 w-24">
								<Avatar.Image
									src={page?.data?.session?.user?.image}
									alt={page?.data?.session?.user?.name}
								/>
								<Avatar.Fallback>
									{user?.name?.split(' ')[0].split('')[0]}{user?.name?.split(' ')[1].split('')[0]}
								</Avatar.Fallback>
							</Avatar.Root>
							<div>
								<p class="text-xl font-semibold text-gray-900">
									{user?.name}
								</p>
								<p class="text-sm text-muted-foreground">{page?.data?.session?.user?.email}</p>
								<form action="/logout" method="POST" class="mt-2">
									<Button variant="outline" size="sm" type="submit">
										<LogOut />
										Logout
									</Button>
								</form>
							</div>
						</div>
						<a
							href="/app"
							class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-gray-900 hover:bg-gray-50"
							onclick={() => (mobileMenuOpen = false)}
						>
							Dashboard
						</a>
					{:else}
						<a
							href="/login"
							class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-gray-900 hover:bg-gray-50"
							onclick={() => (mobileMenuOpen = false)}
						>
							<LogIn class="mr-2 inline" size={24} />
							Einloggen
						</a>
					{/if}
					<a
						href="https://github.com"
						class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-gray-900 hover:bg-gray-50"
						onclick={() => (mobileMenuOpen = false)}
					>
						<Github class="mr-2 inline" size={24} />
						Github
					</a>
					<a
						href="moin@akmann.dev"
						class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-gray-900 hover:bg-gray-50"
						onclick={() => (mobileMenuOpen = false)}
					>
						<Mail class="mr-2 inline" size={24} />
						Email
					</a>
				</div>
			</div>
		</div>
	</div>
</header>
