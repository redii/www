<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button';
	import * as ButtonGroup from '$lib/components/ui/button-group';
	import { Badge } from '$lib/components/ui/badge';

	interface Props {
		collection: string;
		id: string;
		emojis: Array<{
			text: string;
			value: string;
			counter: number;
		}>;
	}

	let { collection, id, emojis }: Props = $props();
	let reactiveEmojis: Array<{ text: string; value: string; counter: number }> = $state(emojis);
	let reactions: string[] = $state([]);

	onMount(() => {
		if (browser) {
			// parse stored reactions from local storage
			const storedReactionsString = localStorage.getItem('vacation_day_reactions');
			if (storedReactionsString) {
				const storedReactions = JSON.parse(storedReactionsString) || [];
				reactions = storedReactions.filter((r: any) => r.id === id).map((r: any) => r.reaction);
			}
		}
	});

	async function react(emoji: string) {
		await fetch('/api/reactions', {
			method: 'POST',
			body: JSON.stringify({
				emoji,
				related_items: [
					{
						collection,
						item: id
					}
				]
			})
		});

		// add reaction to local storage
		let storedReactions = [];
		const storedReactionsString = localStorage.getItem('vacation_day_reactions');
		if (storedReactionsString) storedReactions = JSON.parse(storedReactionsString);
		storedReactions.push({ id, reaction: emoji });
		localStorage.setItem('vacation_day_reactions', JSON.stringify(storedReactions));
		reactions.push(emoji);

		// increase counter
		const emojiIndex = reactiveEmojis.map((e) => e.value).indexOf(emoji);
		reactiveEmojis[emojiIndex].counter += 1;
	}
</script>

<ButtonGroup.Root>
	{#each reactiveEmojis as emoji}
		<Button variant="outline" onclick={() => react(emoji.value)} class="px-2">
			{#if emoji.counter}
				<Badge
					variant="secondary"
					class={reactions.includes(emoji.value) ? 'bg-blue-500 text-white dark:bg-blue-600' : ''}
				>
					{emoji.counter}
				</Badge>
			{/if}
			<span class="text-lg" data-value={emoji.value}>{emoji.text}</span>
		</Button>
	{/each}
</ButtonGroup.Root>
