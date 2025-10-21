<script lang="ts">
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
	let reactiveEmojis = $state(emojis);

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

		const emojiIndex = reactiveEmojis.map((e) => e.value).indexOf(emoji);
		reactiveEmojis[emojiIndex].counter += 1;
	}
</script>

<ButtonGroup.Root>
	{#each reactiveEmojis as emoji}
		<Button variant="outline" onclick={() => react(emoji.value)} class="px-2">
			{#if emoji.counter}
				<Badge variant="secondary">{emoji.counter}</Badge>
			{/if}
			<span class="text-lg" data-value={emoji.value}>{emoji.text}</span>
		</Button>
	{/each}
</ButtonGroup.Root>
