<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { invalidateAll as sv_invalidateAll, goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { showToast } from '$lib/utils/show-toast';

	interface Props {
		form?: HTMLFormElement | undefined;
		method: 'POST' | 'GET' | 'DIALOG' | null | undefined;
		action: string;
		invalidateAll?: Boolean;
		onsuccess?: Function;
		onfailure?: Function;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let {
		form = $bindable(undefined),
		method = 'POST',
		action = '',
		invalidateAll = true,
		onsuccess,
		onfailure,
		class: className = '',
		children,
		...restProps
	}: Props = $props();

	async function handleSubmit() {
		try {
			// disable submitButtons
			setSubmitButtonDisableState(true);

			return async ({ result }: { result: ActionResult }) => {
				if (result.type === 'redirect') {
					goto(result.location);
				} else {
					await applyAction(result); // updates form variable
					if (invalidateAll) await sv_invalidateAll(); // causes reloading data from the server
				}

				// enable submitButtons after form action
				setSubmitButtonDisableState(false);

				const data = result.type === 'success' || result.type === 'failure' ? result.data : null;

				// execute followup functions if given
				if (onsuccess && data?.success === true) onsuccess();
				if (onfailure && data?.success === false) onfailure();

				// display toast if returned
				const toastData: Toast | undefined = data?.toast;
				if (toastData) {
					showToast(toastData);
				}
			};
		} catch (err) {
			toast.error('Etwas ist schiefgelaufen', {
				description: 'Ein unerwarteter Fehler ist aufgetreten'
			});
			console.error(err);
		}
	}

	function setSubmitButtonDisableState(disabled: boolean) {
		if (form) {
			const submitButtons: NodeListOf<HTMLButtonElement> =
				form.querySelectorAll('button[type="submit"]');
			submitButtons.forEach((button) => {
				button.disabled = disabled;
			});
		}
	}
</script>

<form
	bind:this={form}
	use:enhance={handleSubmit}
	{action}
	{method}
	class={className}
	enctype="multipart/form-data"
	{...restProps}
>
	{@render children?.()}
</form>
