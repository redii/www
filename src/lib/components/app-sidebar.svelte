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
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<svg
						id="tilde"
						viewBox="0 0 148 42"
						xmlns="http://www.w3.org/2000/svg"
						class="mt-4 ml-2 w-10 overflow-visible fill-foreground stroke-foreground"
					>
						<path
							d="M0.401432 40.283C-1.04305 38.5426 1.39719 33.2902 7.942 24.0529C17.2553 10.908 30.1511 2.35334 43.5347 0.441766C53.6946 -1.00938 62.455 0.970461 79.3382 8.53318C95.7103 15.8669 100.552 17.1628 108.729 16.3992C117.359 15.5933 124.773 12.5909 135.459 5.57426C148.661 -3.09462 151.008 -1.25762 144.225 12.4345C133.8 33.479 115.174 44.0984 94.0298 41.0523C89.5447 40.4061 82.2521 38.1542 75.2658 35.258C55.4933 27.0614 53.1228 26.475 41.8382 26.9898C30.2611 27.5179 25.1636 29.1786 12.0642 36.6896C7.25167 39.4491 2.92464 41.7068 2.44861 41.7068C1.97257 41.7068 1.05134 41.0662 0.401432 40.283ZM17.3979 31.2419C26.7682 26.43 34.5628 24.4146 43.8382 24.4055C53.4697 24.3941 57.2937 25.3853 72.6494 31.8599C92.2788 40.1364 101.915 41.1999 115.838 36.6267C123.281 34.1821 129.99 29.3426 135.458 22.4736C140.16 16.5665 146.719 3.39376 145.224 2.8591C144.689 2.66786 140.689 4.85056 136.334 7.70958C125.623 14.7414 117.488 17.9071 108.629 18.4901C99.4759 19.0925 94.7668 17.8923 79.5387 11.0754C55.6653 0.388633 45.8876 -0.43651 30.3979 6.92843C22.4501 10.7074 11.4451 21.4686 6.0882 30.6994C1.13741 39.2305 1.23458 40.4966 6.58821 37.2153C8.92571 35.7827 13.7901 33.0946 17.3979 31.2419Z"
							stroke-width="1"
						/>
					</svg>
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
