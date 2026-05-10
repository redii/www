<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import Form from '$lib/components/form.svelte';
	import MessageCirclePlus from '@lucide/svelte/icons/message-circle-plus';
	import MessageCircleHeart from '@lucide/svelte/icons/message-circle-heart';

	interface Props {
		day: any;
	}

	let { day }: Props = $props();

	const dayDate = new Date(day.date);
	let commentDialogIsOpen = $state(false);
</script>

{#if day.comments.length}
	<Drawer.Root>
		<Drawer.Trigger>
			<Button variant="outline">
				<MessageCircleHeart class="size-5" />
				<span class="sr-only md:not-sr-only">Kommentare</span>
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
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
			<MessageCirclePlus class="size-5" />
			<span class="sr-only md:not-sr-only">Kommentieren</span>
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
