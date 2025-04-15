<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	export let data;
</script>

<Breadcrumb.Root class="mb-4 sm:mb-8">
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Page>Übersicht</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Urlaube</h1>

<ul class="mt-12 flex flex-col gap-6">
	{#each data.vacations as vacation}
		{@const startDate = new Date(vacation.start_date)}
		{@const vacationMonth = startDate.toLocaleString('de', { month: 'long' })}
		{@const vacationYear = startDate.getFullYear()}
		<li>
			<a href={`/vacations/${vacation.id}`}>
				<Card.Root>
					<Card.Content class="flex flex-col-reverse justify-between md:flex-row">
						<div class="flex flex-col gap-2">
							<Card.Title class="text-2xl">{vacation.title}</Card.Title>
							<Card.Description>{vacationMonth} {vacationYear}</Card.Description>
						</div>
						<img
							src={`${PUBLIC_DIRECTUS_URL}/assets/${vacation.image}?width=512`}
							alt={vacation.title}
							loading="lazy"
							class="mb-4 h-32 w-full rounded-lg object-cover object-center md:mb-0 md:h-24 md:w-48"
						/>
					</Card.Content>
				</Card.Root>
			</a>
		</li>
	{/each}
</ul>
