<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();
</script>

<div class="flex flex-row items-center gap-4">
	<img
		src={page?.data?.session?.user?.image}
		alt="User Avatar"
		class="h-16 w-16 rounded-full border border-gray-200 bg-muted shadow-sm"
	/>
	<div>
		<h1 class="mb-1 scroll-m-20 text-4xl font-bold tracking-tight">
			{page?.data?.session?.user?.name}
		</h1>
		<p class="text-sm text-muted-foreground">{page?.data?.session?.user?.email}</p>
	</div>
</div>

<section class="mt-12">
	{@render children()}
</section>
