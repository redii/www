<script lang="ts">
	import * as Card from '$lib/components/ui/card';
</script>

<div class="flex flex-col items-center gap-14 md:mt-12 lg:flex-row">
	<img src="/images/pp.jpg" alt="Henry Akmann" class="mx-auto h-64 w-64 rounded-full bg-muted" />
	<div>
		<span class="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-7xl">Moin 👋</span>
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
					<Card.Title>Blog Posts</Card.Title>
					<Card.Description>
						Wenn ich mal was zu berichten habe, könnte es sein, dass ich hier einen Post schreibe.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<span class="text-sm font-medium leading-none duration-200 group-hover:text-emerald-500">
						Zu meinen Posts <span aria-hidden="true">&rarr;</span>
					</span>
				</Card.Content>
			</Card.Root>
		</a>
	</li>
	<li>
		<a href="/itadm" class="group">
			<Card.Root>
				<Card.Header>
					<Card.Title>ITADM Kursinhalte</Card.Title>
					<Card.Description>
						Wenn du Teilnehmer einer meiner Kurse bist, findest du hier alle Unterlagen.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<span class="text-sm font-medium leading-none duration-200 group-hover:text-emerald-500">
						Zu den Unterlagen <span aria-hidden="true">&rarr;</span>
					</span>
				</Card.Content>
			</Card.Root>
		</a>
	</li>
</ul>
