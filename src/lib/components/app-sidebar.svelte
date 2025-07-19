<script lang="ts">
	import { page } from '$app/state';

	import * as Sidebar from '$lib/components/ui/sidebar';
	import HouseIcon from '@lucide/svelte/icons/house';
	import Server from '@lucide/svelte/icons/server';

	// Menu items.
	const items = [
		{
			title: 'Dashboard',
			url: '/app',
			icon: HouseIcon,
			pathMatching: (url: URL) => url.pathname === '/app' || url.pathname === '/app/'
		},
		{
			title: 'ITADM Server',
			url: '/app/itadm',
			icon: Server
		}
	];
</script>

<Sidebar.Root variant="sidebar">
	<Sidebar.Content>
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
</Sidebar.Root>
