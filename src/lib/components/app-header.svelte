<script lang="ts">
	import { page } from '$app/state';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<header
	class="sticky flex h-[64px] w-full flex-row items-center justify-between border-b bg-sidebar px-8"
>
	<Sidebar.Trigger size="icon" />
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
			<DropdownMenu.Content class="mr-2">
				<DropdownMenu.Group>
					<DropdownMenu.GroupHeading>
						{page?.data?.session?.user?.name}
					</DropdownMenu.GroupHeading>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<a href="/">Startseite</a>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<form action="/logout" method="POST">
							<button type="submit">Logout</button>
						</form>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
</header>
