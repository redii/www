<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	export let data;
</script>

<div class="flex flex-col items-center gap-14 md:mt-12 lg:flex-row">
	<img
		src="/images/pp.jpeg"
		alt="Henry Akmann"
		class="mx-auto h-64 w-64 rounded-full border border-foreground/10 bg-muted shadow-sm"
	/>
	<div>
		<span class="scroll-m-20 text-7xl font-extrabold tracking-tight">
			Moin
			<img
				src="/images/waving-hand.png"
				alt="Waving Hand 👋"
				class="relative bottom-2 ml-4 inline h-20 w-20 origin-bottom-right animate-waving-hand"
				style="animation-delay: 1.5s;"
			/>
		</span>
		<h1 class="sr-only">Henry Akmann</h1>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Ich bin Henry, komme aus Hannover und ich programmiere und baue gerne Dinge.
		</p>
	</div>
</div>

<ul class="mt-20 grid gap-8 md:grid-cols-2">
	<li>
		<a href="/posts" class="group">
			<Card.Root>
				<Card.Header>
					<Card.Title aria-level={2}>Blog Posts</Card.Title>
					<Card.Description>
						Wenn ich mal was zu berichten habe, könnte es sein, dass ich hier einen Post schreibe.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<span class="text-sm leading-none font-medium duration-200 group-hover:text-emerald-500">
						Zu den Posts <span aria-hidden="true">&rarr;</span>
					</span>
				</Card.Content>
			</Card.Root>
		</a>
	</li>

	<li>
		<a href="/itadm" class="group">
			<Card.Root>
				<Card.Header>
					<Card.Title aria-level={2}>ITADM Kursinhalte</Card.Title>
					<Card.Description>
						Wenn du Teilnehmer einer meiner Kurse bist, findest du hier alle Unterlagen.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<span class="text-sm leading-none font-medium duration-200 group-hover:text-emerald-500">
						Zu den Unterlagen <span aria-hidden="true">&rarr;</span>
					</span>
				</Card.Content>
			</Card.Root>
		</a>
	</li>

	<li class="md:col-span-2">
		<a href="/vacations" class="group">
			<Card.Root class="flex flex-col justify-between gap-0 overflow-hidden py-0 md:flex-row">
				<Card.Header class="py-6 md:w-1/2">
					<Card.Title aria-level={2}>Urlaube</Card.Title>
					<Card.Description>
						Damit die schönen Erinnerungen nicht so schnell verloren gehen.
					</Card.Description>
					<span
						class="mt-6 text-sm leading-none font-medium duration-200 group-hover:text-emerald-500"
					>
						Zur Übersicht <span aria-hidden="true">&rarr;</span>
					</span>
				</Card.Header>
				<div class="order-first flex h-32 flex-row items-stretch md:order-last md:h-auto md:w-1/2">
					{#each data.vacations as vacation}
						<div class="relative border-l">
							<img
								src={`${PUBLIC_DIRECTUS_URL}/assets/${vacation.image}?format=webp&quality=75&width=480`}
								alt={vacation.title}
								class="h-full object-cover"
							/>
							<div
								class="absolute inset-0 bg-black opacity-10 opacity-20 duration-200 hover:opacity-0"
							></div>
						</div>
					{/each}
				</div>
			</Card.Root>
		</a>
	</li>
</ul>
