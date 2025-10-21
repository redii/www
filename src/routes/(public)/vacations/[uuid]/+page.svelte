<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import * as Drawer from '$lib/components/ui/drawer';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import LightboxItem from '$lib/components/lightbox/LightboxItem.svelte';
	import Form from '$lib/components/form.svelte';
	import Reactions from './reactions.svelte';
	import Gmaps from '$lib/components/gmaps.svelte';
	import Share2 from '@lucide/svelte/icons/share-2';
	import MapPinned from '@lucide/svelte/icons/map-pinned';
	import MessageCirclePlus from '@lucide/svelte/icons/message-circle-plus';
	import MessageCircleHeart from '@lucide/svelte/icons/message-circle-heart';

	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	let { data } = $props();

	const startDate = new Date(data.vacation.start_date);
	const vacationMonth = startDate.toLocaleString('de', { month: 'long' });
	const vacationYear = startDate.getFullYear();

	let commentDialogIsOpen = $state(false);
</script>

<svelte:head>
	<title>
		{data.vacation.title} ·
		{vacationMonth}
		{vacationYear}
	</title>
</svelte:head>

{#if data.vacation.image}
	<img
		src={`${PUBLIC_DIRECTUS_URL}/assets/${data.vacation.image}?format=webp&width=1024`}
		alt={data.vacation.title}
		class="max-h-80 w-full rounded-2xl border border-foreground/10 bg-muted object-cover object-center shadow-sm sm:max-h-[400px]"
	/>
{/if}

<section id="vacation-heading" class="mt-8 mb-16">
	<div class="flex flex-col items-center items-start justify-between gap-4 sm:flex-row">
		<div>
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{data.vacation.title}
			</h1>
			<time datetime={data.vacation.start_date} class="mt-1 block text-lg md:mt-2">
				{vacationMonth}
				{vacationYear}
			</time>
		</div>
		<div class="flex flex-row gap-2">
			<Button
				variant="secondary"
				size="icon"
				class="size-12"
				onclick={async () => {
					const url = new URL(window.location.href);
					url.search = '';
					url.searchParams.set('password', data.vacationPassword || '');
					if (navigator.share) {
						await navigator.share({
							title: `${data.vacation.title} · ${vacationMonth} ${vacationYear}`,
							url: url.toString()
						});
					} else {
						navigator.clipboard.writeText(url.toString());
						toast.success('Link zum teilen wurde in die Zwischenablage gelegt');
					}
				}}
			>
				<Share2 class="size-5" />
				<span class="sr-only">Teilen</span>
			</Button>
			<LightboxItem gallery={`locations-${data.vacation.id}`}>
				<Button variant="secondary" size="icon" class="size-12">
					<MapPinned class="size-5" />
					<span class="sr-only">Übersichtskarte anzeigen</span>
				</Button>
				{#snippet lightboxContent()}
					<Gmaps
						location={{
							lat: data.vacation.location.coordinates[1],
							lng: data.vacation.location.coordinates[0]
						}}
						zoom={data.vacation.location_zoom}
						markers={data.vacationDays.map((vd) => {
							if (vd.location)
								return {
									lat: vd.location.coordinates[1],
									lng: vd.location.coordinates[0]
								};
						})}
						class="h-[60vh] w-full"
					/>
				{/snippet}
			</LightboxItem>
		</div>
	</div>
</section>

<ul class="mb-10 flex flex-col gap-16">
	{#each data.vacationDays as day}
		{@const dayDate = new Date(day.date)}
		{@const longitude = day.location?.coordinates[0]}
		{@const latitude = day.location?.coordinates[1]}
		<li>
			<div class="mb-4 border-b">
				<time datetime={day.date} class="text-muted-foreground">
					{dayDate.toLocaleDateString('de')}
				</time>
				<h2
					class="scroll-m-20 pb-1 text-3xl font-semibold tracking-tight transition-colors first:mt-0 lg:pb-2"
				>
					{day.title}
				</h2>
			</div>

			<p class="leading-7 [&:not(:first-child)]:mt-6">
				{@html day.text.trim().replace(/\n/g, '<br>')}
			</p>

			{#if day.images.length}
				<div class="mt-4 grid grid-cols-3 items-center justify-center gap-2">
					{#each day.images as entry}
						<LightboxItem gallery={`ìmages-${data.vacation.id}`}>
							<AspectRatio ratio={1}>
								<img
									src={`${PUBLIC_DIRECTUS_URL}/assets/${entry.image}?format=webp&height=320&width=320`}
									alt={entry.description}
									class="h-full w-full rounded-xl bg-muted object-cover"
									loading="lazy"
								/>
							</AspectRatio>
							{#snippet lightboxContent()}
								<img
									src={`${PUBLIC_DIRECTUS_URL}/assets/${entry.image}?format=webp&quality=75&width=1600&withoutEnlargement=true`}
									alt={entry.description}
									class="h-full w-full object-contain"
									loading="lazy"
								/>
							{/snippet}
						</LightboxItem>
					{/each}
				</div>
			{/if}

			<div class="mt-4 flex flex-row gap-2">
				{#if longitude && latitude}
					<LightboxItem gallery={`locations-${data.vacation.id}`}>
						<Button variant="outline">
							<MapPinned class="size-5" />
							Karte
						</Button>
						{#snippet lightboxContent()}
							<Gmaps
								location={{
									lat: day.location.coordinates[1],
									lng: day.location.coordinates[0]
								}}
								locationMarker={true}
								zoom={12}
								class="h-[60vh] w-full"
							/>
						{/snippet}
					</LightboxItem>
				{/if}

				<div class="grow"></div>

				{#if day.comments.length}
					<Drawer.Root>
						<Drawer.Trigger>
							<Button variant="outline">
								<MessageCircleHeart class="size-5" />
								<span class="sr-only">Kommentare</span>
							</Button>
						</Drawer.Trigger>
						<Drawer.Content class="mx-auto max-w-2xl">
							<Drawer.Header>
								<Drawer.Title>{day.title}</Drawer.Title>
								<Drawer.Description>
									Kommentare zum {dayDate.toLocaleDateString('de')}
								</Drawer.Description>
							</Drawer.Header>
							<div class="flex flex-col gap-2 px-4">
								{#each day.comments as comment}
									<div class="rounded-md bg-secondary px-3 py-2">
										<small class="block">
											<span class="font-semibold">{comment.author || 'Anonym'}</span>
											am {new Date(comment.date_created).toLocaleDateString('de')}
										</small>
										{comment.text}
									</div>
								{/each}
							</div>
							<hr class="mt-4" />
							<Drawer.Footer>
								<Dialog.Root bind:open={commentDialogIsOpen}>
									<Dialog.Trigger class={buttonVariants()}>Kommentar schreiben</Dialog.Trigger>
									<Dialog.Content>
										<Dialog.Header>
											<Dialog.Title>Kommentieren...</Dialog.Title>
											<Dialog.Description>
												{day.title} - {dayDate.toLocaleDateString('de')}
											</Dialog.Description>
										</Dialog.Header>
										<Form
											method="POST"
											action="?/postComment"
											onsuccess={() => (commentDialogIsOpen = false)}
											class="flex flex-col gap-2"
										>
											<Input name="author" type="text" placeholder="Anonym" maxlength={32} />
											<Textarea name="text" placeholder="Dein Kommentar..." rows={5} />
											<input name="vacation_day" type="hidden" value={day.id} />
											<Button type="submit">Speichern</Button>
										</Form>
									</Dialog.Content>
								</Dialog.Root>
								<Drawer.Close>Schließen</Drawer.Close>
							</Drawer.Footer>
						</Drawer.Content>
					</Drawer.Root>
				{:else}
					<Dialog.Root>
						<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
							<MessageCirclePlus class="size-5" />
							<span class="sr-only">Kommentieren</span>
						</Dialog.Trigger>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Kommentieren...</Dialog.Title>
								<Dialog.Description>
									{day.title} - {dayDate.toLocaleDateString('de')}
								</Dialog.Description>
							</Dialog.Header>
							<Form method="POST" action="?/postComment" class="flex flex-col gap-2">
								<Input name="author" type="text" placeholder="Anonym" maxlength={32} />
								<Textarea name="text" placeholder="Dein Kommentar..." rows={5} />
								<input name="vacation_day" type="hidden" value={day.id} />
								<Button type="submit">Speichern</Button>
							</Form>
						</Dialog.Content>
					</Dialog.Root>
				{/if}

				<!-- <Reactions
					collection="vacation_days"
					id={day.id}
					counters={{ heart: 0, cowboy: 0, oh: 0 }}
				/> -->
			</div>
		</li>
	{/each}
</ul>
