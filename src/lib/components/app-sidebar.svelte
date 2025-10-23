<script lang="ts">
	import { page } from '$app/state';

	import Tilde from '$lib/components/tilde.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button';
	import LogOut from '@lucide/svelte/icons/log-out';
	import HouseIcon from '@lucide/svelte/icons/house';
	import GraduationCap from '@lucide/svelte/icons/graduation-cap';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';

	const items = [
		{
			title: 'Dashboard',
			url: '/app',
			icon: HouseIcon,
			pathMatching: (url: URL) => url.pathname === '/app'
		},
		{
			title: 'ITADM Kurs',
			url: '/app/itadm',
			icon: GraduationCap
		}
	];
</script>

<Sidebar.Root variant="sidebar">
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<div class="pt-5 pl-2">
						<Tilde />
					</div>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								isActive={item.pathMatching
									? item.pathMatching(page.url)
									: page.url.pathname.startsWith(item.url)}
							>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				{#if page?.data?.session}
					{@const user = page?.data?.session?.user}
					{@const firstInitial = user?.name?.split(' ')[0]?.charAt(0) || ''}
					{@const secondInitial = user?.name?.split(' ')[1]?.charAt(0) || ''}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuButton
									{...props}
									class="py-6 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<Avatar.Root class="h-8 w-8 rounded-md">
										<Avatar.Image src={user?.image} alt={user?.name} />
										<Avatar.Fallback>{firstInitial} {secondInitial}</Avatar.Fallback>
									</Avatar.Root>
									<div>
										<p class="text-sidebar-foreground">{user?.name}</p>
										<small class="text-xs text-sidebar-foreground/70">{user?.email}</small>
									</div>
									<ChevronUp class="ml-auto" />
								</Sidebar.MenuButton>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content side="top" class="w-(--bits-dropdown-menu-anchor-width)">
							<DropdownMenu.Item class="cursor-pointer">
								<a href="/" class="w-full">Startseite</a>
							</DropdownMenu.Item>
							<form method="POST" action="/logout">
								<Button variant="ghost" size="sm" type="submit" class="w-full">
									<LogOut class="size-3" />
									Logout
								</Button>
							</form>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{/if}
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
