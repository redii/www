<script lang="ts">
	import { page } from '$app/state';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Menu, X, Github, Mail, LogIn, LogOut, Sun, Moon } from '@lucide/svelte';
	import { toggleMode } from 'mode-watcher';
	import publicKey from '$lib/public_key.asc?raw';

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
				<img src="/images/tilde-black.svg" alt="Tilde Emblem" class="block w-10 dark:hidden" />
				<img src="/images/tilde-white.svg" alt="Tilde Emblem" class="hidden w-10 dark:block" />
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
			<Button href="https://github.com/redii" target="_blank" variant="ghost" size="icon">
				<span class="sr-only">Github</span>
				<Github />
			</Button>
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
					<span class="sr-only">Kontakt</span>
					<Mail />
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Kontaktdaten</Dialog.Title>
						<Dialog.Description>
							Schreib mir gerne eine Nachricht an
							<span class="font-semibold">henry@akmann.dev</span>
						</Dialog.Description>
					</Dialog.Header>
					<ScrollArea class="h-48 rounded-md border">
						<pre class="p-4 text-xs">{publicKey}</pre>
					</ScrollArea>
					<Button href="mailto:henry@akmann.dev" variant="secondary">
						<Mail class="mr-1 inline" size={24} />
						Schreib mir eine Email
					</Button>
				</Dialog.Content>
			</Dialog.Root>
			<Button onclick={toggleMode} variant="ghost" size="icon" class="ml-2">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Theme umschalten</span>
			</Button>
			{#if page?.data?.session}
				{@const user = page?.data?.session?.user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root>
							<Avatar.Image
								src={page?.data?.session?.user?.image}
								alt={page?.data?.session?.user?.name}
							/>
							<Avatar.Fallback>
								{user?.name?.split(' ')[0]?.split('')[0]}
								{user?.name?.split(' ')[1]?.split('')[0]}
							</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.GroupHeading>
								{page?.data?.session?.user?.name}
							</DropdownMenu.GroupHeading>
							<DropdownMenu.Separator />
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
				<Button variant="secondary" href="/login">Einloggen</Button>
			{/if}
		</div>
	</nav>

	<!-- Mobile menu, show/hide based on menu open state. -->
	<div class="lg:hidden" class:hidden={!mobileMenuOpen} role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="z-60 fixed inset-0"></div>
		<div
			class="z-60 fixed inset-y-0 right-0 w-full overflow-y-auto bg-background px-6 py-5 sm:max-w-sm sm:ring-1 sm:ring-foreground/90"
		>
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5 sm:invisible">
					<span class="sr-only">Henry Akmann</span>
					<img src="/images/tilde-black.svg" alt="Tilde Emblem" class="block w-10 dark:hidden" />
					<img src="/images/tilde-white.svg" alt="Tilde Emblem" class="hidden w-10 dark:block" />
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
				<div class="flex min-h-96 flex-col items-center justify-center gap-6 py-6">
					{#if page?.data?.session}
						<a
							href="/app"
							class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-foreground hover:bg-foreground/10"
							onclick={() => (mobileMenuOpen = false)}
						>
							Dashboard
						</a>
					{:else}
						<a
							href="/login"
							class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-foreground hover:bg-foreground/10"
							onclick={() => (mobileMenuOpen = false)}
						>
							<LogIn class="mr-2 inline" size={24} />
							Einloggen
						</a>
					{/if}
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
						href="mailto:henry@akmann.dev"
						class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-foreground hover:bg-foreground/10"
						onclick={() => (mobileMenuOpen = false)}
					>
						<Mail class="mr-2 inline" size={24} />
						Email
					</a>
					{#if page?.data?.session}
						{@const user = page?.data?.session?.user}
						<div class="mt-16 flex flex-row items-center gap-3">
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
