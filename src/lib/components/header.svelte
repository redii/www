<script lang="ts">
	import { page, navigating } from '$app/state';

	import publicKey from '$lib/public-key.asc?raw';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
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

	$effect(() => {
		if (navigating.to) {
			document.getElementById('tilde')?.classList.add('animate-pulsating-tilde');
			setTimeout(() => {
				document.getElementById('tilde')?.classList.remove('animate-pulsating-tilde');
			}, 1100);
		}
	});
</script>

<header class="sticky top-0 z-50 border-b border-foreground/10 bg-background/75">
	<nav
		class="sticky top-0 mx-auto flex h-[64px] max-w-4xl items-center justify-between px-6 backdrop-blur lg:px-8"
		aria-label="Global"
	>
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">Henry Akmann</span>
				<svg
					id="tilde"
					viewBox="0 0 148 42"
					xmlns="http://www.w3.org/2000/svg"
					class="w-10 overflow-visible fill-foreground stroke-foreground"
				>
					<path
						d="M0.401432 40.283C-1.04305 38.5426 1.39719 33.2902 7.942 24.0529C17.2553 10.908 30.1511 2.35334 43.5347 0.441766C53.6946 -1.00938 62.455 0.970461 79.3382 8.53318C95.7103 15.8669 100.552 17.1628 108.729 16.3992C117.359 15.5933 124.773 12.5909 135.459 5.57426C148.661 -3.09462 151.008 -1.25762 144.225 12.4345C133.8 33.479 115.174 44.0984 94.0298 41.0523C89.5447 40.4061 82.2521 38.1542 75.2658 35.258C55.4933 27.0614 53.1228 26.475 41.8382 26.9898C30.2611 27.5179 25.1636 29.1786 12.0642 36.6896C7.25167 39.4491 2.92464 41.7068 2.44861 41.7068C1.97257 41.7068 1.05134 41.0662 0.401432 40.283ZM17.3979 31.2419C26.7682 26.43 34.5628 24.4146 43.8382 24.4055C53.4697 24.3941 57.2937 25.3853 72.6494 31.8599C92.2788 40.1364 101.915 41.1999 115.838 36.6267C123.281 34.1821 129.99 29.3426 135.458 22.4736C140.16 16.5665 146.719 3.39376 145.224 2.8591C144.689 2.66786 140.689 4.85056 136.334 7.70958C125.623 14.7414 117.488 17.9071 108.629 18.4901C99.4759 19.0925 94.7668 17.8923 79.5387 11.0754C55.6653 0.388633 45.8876 -0.43651 30.3979 6.92843C22.4501 10.7074 11.4451 21.4686 6.0882 30.6994C1.13741 39.2305 1.23458 40.4966 6.58821 37.2153C8.92571 35.7827 13.7901 33.0946 17.3979 31.2419Z"
						stroke-width="1"
					/>
				</svg>
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
			{#if page?.data?.showVacationLink}
				<Button href="/vacations" variant="ghost" size="icon">
					<span class="sr-only">Urlaube</span>
					<TreePalm />
				</Button>
			{/if}
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
				<a href="/" class="-m-1.5 p-1.5 sm:invisible" onclick={() => (mobileMenuOpen = false)}>
					<span class="sr-only">Henry Akmann</span>
					<svg
						viewBox="0 0 148 42"
						xmlns="http://www.w3.org/2000/svg"
						class="w-10 overflow-visible fill-foreground stroke-foreground"
					>
						<path
							d="M0.401432 40.283C-1.04305 38.5426 1.39719 33.2902 7.942 24.0529C17.2553 10.908 30.1511 2.35334 43.5347 0.441766C53.6946 -1.00938 62.455 0.970461 79.3382 8.53318C95.7103 15.8669 100.552 17.1628 108.729 16.3992C117.359 15.5933 124.773 12.5909 135.459 5.57426C148.661 -3.09462 151.008 -1.25762 144.225 12.4345C133.8 33.479 115.174 44.0984 94.0298 41.0523C89.5447 40.4061 82.2521 38.1542 75.2658 35.258C55.4933 27.0614 53.1228 26.475 41.8382 26.9898C30.2611 27.5179 25.1636 29.1786 12.0642 36.6896C7.25167 39.4491 2.92464 41.7068 2.44861 41.7068C1.97257 41.7068 1.05134 41.0662 0.401432 40.283ZM17.3979 31.2419C26.7682 26.43 34.5628 24.4146 43.8382 24.4055C53.4697 24.3941 57.2937 25.3853 72.6494 31.8599C92.2788 40.1364 101.915 41.1999 115.838 36.6267C123.281 34.1821 129.99 29.3426 135.458 22.4736C140.16 16.5665 146.719 3.39376 145.224 2.8591C144.689 2.66786 140.689 4.85056 136.334 7.70958C125.623 14.7414 117.488 17.9071 108.629 18.4901C99.4759 19.0925 94.7668 17.8923 79.5387 11.0754C55.6653 0.388633 45.8876 -0.43651 30.3979 6.92843C22.4501 10.7074 11.4451 21.4686 6.0882 30.6994C1.13741 39.2305 1.23458 40.4966 6.58821 37.2153C8.92571 35.7827 13.7901 33.0946 17.3979 31.2419Z"
							stroke-width="1"
						/>
					</svg>
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
					{#if page?.data?.showVacationLink}
						<a
							href="/vacations"
							class="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-xl font-semibold text-foreground hover:bg-foreground/10"
							onclick={() => (mobileMenuOpen = false)}
						>
							<TreePalm class="mr-2 inline" size={24} />
							Urlaube
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
