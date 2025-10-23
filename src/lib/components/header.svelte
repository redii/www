<script lang="ts">
	import { page } from '$app/state';

	import publicKey from '$lib/public-key.asc?raw';
	import Tilde from '$lib/components/tilde.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { toggleMode } from 'mode-watcher';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import TreePalm from '@lucide/svelte/icons/tree-palm';
	import Github from '@lucide/svelte/icons/github';
	import Mail from '@lucide/svelte/icons/mail';
	import LogIn from '@lucide/svelte/icons/log-in';
	import LogOut from '@lucide/svelte/icons/log-out';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';

	let mobileMenuOpen = $state(false);
</script>

<header class="sticky top-0 z-50 border-b border-foreground/10 bg-background/75">
	<nav
		class="sticky top-0 mx-auto flex h-[64px] max-w-4xl items-center justify-between px-6 backdrop-blur lg:px-8"
		aria-label="Global"
	>
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">Henry Akmann</span>
				<Tilde />
			</a>
		</div>
		<div class="flex lg:hidden">
			<button
				type="button"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			>
				<span class="sr-only">Menü öffnen</span>
				<Menu />
			</button>
		</div>
		<div class="hidden gap-2 lg:flex lg:flex-1 lg:justify-end">
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button href="/vacations" variant="ghost" size="icon">
							<span class="sr-only">Urlaube</span>
							<TreePalm />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Urlaube</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button href="https://github.com/redii" target="_blank" variant="ghost" size="icon">
							<span class="sr-only">Github Profil</span>
							<Github />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Github Profil</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
			<Dialog.Root>
				<Dialog.Trigger>
					<Tooltip.Provider>
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button variant="ghost" size="icon">
									<span class="sr-only">Kontaktdaten</span>
									<Mail />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>Kontaktdaten</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Kontaktdaten</Dialog.Title>
						<Dialog.Description>
							Schreib mir gerne eine Nachricht an
							<span class="font-semibold">moin@akmann.dev</span>
						</Dialog.Description>
					</Dialog.Header>
					<ScrollArea class="h-48 rounded-md border">
						<pre class="p-4 text-xs">{publicKey}</pre>
					</ScrollArea>
					<Button href="mailto:moin@akmann.dev" variant="secondary">
						<Mail class="mr-1 inline" size={24} />
						Schreib mir eine Email
					</Button>
				</Dialog.Content>
			</Dialog.Root>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button onclick={toggleMode} variant="ghost" size="icon" class="ml-2">
							<Sun
								class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
							/>
							<Moon
								class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
							/>
							<span class="sr-only">Theme umschalten</span>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<span class="dark:hidden">Lightmode</span>
						<span class="hidden dark:block">Darkmode</span>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
			{#if page?.data?.session}
				{@const user = page?.data?.session?.user}
				{@const firstInitial = user?.name?.split(' ')[0]?.charAt(0) || ''}
				{@const secondInitial = user?.name?.split(' ')[1]?.charAt(0) || ''}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root>
							<Avatar.Image src={user?.image} alt={user?.name} />
							<Avatar.Fallback>
								{firstInitial}
								{secondInitial}
							</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="mr-2">
						<DropdownMenu.Group>
							<DropdownMenu.Label>
								{user?.name}
							</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<a href="/app">Dashboard</a>
							</DropdownMenu.Item>
							<form method="POST" action="/logout">
								<Button variant="ghost" size="sm" type="submit" class="w-full">
									<LogOut class="size-3" />
									Logout
								</Button>
							</form>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button variant="secondary" href="/login">Einloggen</Button>
			{/if}
		</div>
	</nav>

	<!-- Mobile menu, show/hide based on menu open state. -->
	<div class="lg:hidden" class:hidden={!mobileMenuOpen} role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="fixed inset-0 z-60"></div>
		<div
			class="fixed inset-y-0 right-0 z-60 w-full overflow-y-auto bg-background px-6 py-5 sm:max-w-sm sm:ring-1 sm:ring-foreground/10"
		>
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5 sm:invisible" onclick={() => (mobileMenuOpen = false)}>
					<span class="sr-only">Henry Akmann</span>
					<Tilde />
				</a>
				<button
					type="button"
					class="-m-2.5 rounded-md p-2.5 text-foreground"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				>
					<span class="sr-only">Menü schließen</span>
					<X />
				</button>
			</div>
			<div class="mt-16 flow-root">
				<div class="flex min-h-[60dvh] flex-col items-center justify-center gap-6 py-6">
					<a
						href="/vacations"
						class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-foreground hover:bg-foreground/10"
						onclick={() => (mobileMenuOpen = false)}
					>
						<TreePalm class="mr-2 inline" size={24} />
						Urlaube
					</a>
					<a
						href="https://github.com"
						target="_blank"
						class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-foreground hover:bg-foreground/10"
						onclick={() => (mobileMenuOpen = false)}
					>
						<Github class="mr-2 inline" size={24} />
						Github
					</a>
					<a
						href="mailto:moin@akmann.dev"
						class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-foreground hover:bg-foreground/10"
						onclick={() => (mobileMenuOpen = false)}
					>
						<Mail class="mr-2 inline" size={24} />
						Email
					</a>
					{#if !page?.data?.session}
						<a
							href="/login"
							class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-foreground hover:bg-foreground/10"
							onclick={() => (mobileMenuOpen = false)}
						>
							<LogIn class="mr-2 inline" size={24} />
							Einloggen
						</a>
					{:else}
						{@const user = page?.data?.session?.user}
						<a
							href="/app"
							class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-foreground hover:bg-foreground/10"
							onclick={() => (mobileMenuOpen = false)}
						>
							Dashboard
						</a>
						<div class="mt-8 flex flex-row items-center gap-3">
							<Avatar.Root class="h-24 w-24">
								<Avatar.Image
									src={page?.data?.session?.user?.image}
									alt={page?.data?.session?.user?.name}
								/>
								<Avatar.Fallback>
									{user?.name?.split(' ')[0]?.split('')[0]}
									{user?.name?.split(' ')[1]?.split('')[0]}
								</Avatar.Fallback>
							</Avatar.Root>
							<div>
								<p class="text-xl font-semibold text-foreground">
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
					{/if}
				</div>
			</div>
		</div>
	</div>
</header>
