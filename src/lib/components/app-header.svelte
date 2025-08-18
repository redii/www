<script lang="ts">
	import { page } from '$app/state';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<header class="sticky flex h-[64px] w-full flex-row items-center justify-between border-b px-8">
	<Sidebar.Trigger size="icon" />
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
					<DropdownMenu.GroupHeading>
						{user?.name}
					</DropdownMenu.GroupHeading>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<a href="/" class="w-full">Startseite</a>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<a href="/logout" class="w-full font-semibold" data-sveltekit-preload-data="off">
							Logout
						</a>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
</header>
