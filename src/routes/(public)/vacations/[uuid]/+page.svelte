<script lang="ts">
	import VacationHeader from './vacation-header.svelte';
	import VacationDay from './vacation-day.svelte';

	let { data } = $props();
</script>

<VacationHeader
	vacation={data.vacation}
	vacationDays={data.vacationDays}
	vacationPassword={data.vacationPassword}
/>

<div class="mb-10 flex flex-col gap-16">
	{#each data.vacationDays as day}
		<VacationDay {day} vacationId={data.vacation.id} />
	{/each}
</div>
