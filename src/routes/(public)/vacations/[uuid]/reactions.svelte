<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as ButtonGroup from '$lib/components/ui/button-group';

	interface Props {
		collection: string;
		id: string;
		counters: {
			heart: number;
			cowboy: number;
			oh: number;
		};
	}

	let { collection, id }: Props = $props();

	async function react(reactionType: 'heart' | 'cowboy' | 'oh') {
		await fetch('/api/reactions', {
			method: 'POST',
			body: JSON.stringify({
				collection,
				id,
				reactionType
			})
		});
	}
</script>

<ButtonGroup.Root>
	<Button variant="outline" onclick={() => react('heart')}>
		<span class="text-lg">❤️</span>
	</Button>
	<Button variant="outline" onclick={() => react('cowboy')}>
		<span class="text-lg">🤠</span>
	</Button>
	<Button variant="outline" onclick={() => react('oh')}>
		<span class="text-lg">😮</span>
	</Button>
</ButtonGroup.Root>
