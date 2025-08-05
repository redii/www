<script lang="ts">
	import { page } from '$app/state';

	import Tilde from '$lib/components/tilde.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import HouseIcon from '@lucide/svelte/icons/house';
	import GraduationCap from '@lucide/svelte/icons/graduation-cap';
	import Sprout from '@lucide/svelte/icons/sprout';

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
		},
		{
			title: 'Pflanzen',
			url: '/app/plants',
			icon: Sprout
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
</Sidebar.Root>
