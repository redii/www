<script lang="ts">
	export let data;
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
	Hallo, {data.session.user?.name} 👋
</h1>

<p class="leading-7 [&:not(:first-child)]:mt-6">
	Leider stehen für dich gerade keine weiteren Funktionen zur Verfügung.
</p>

<details class="mt-6 font-mono text-sm">
	<summary>Session</summary>
	<pre>{JSON.stringify(data.session, null, 2)}</pre>
</details>
