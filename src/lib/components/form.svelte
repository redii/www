<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	interface Props {
		form?: HTMLFormElement | undefined;
		method: 'POST' | 'dialog' | 'get' | 'post' | 'DIALOG' | 'GET' | null | undefined;
		action: string;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let {
		form = $bindable(undefined),
		method = 'POST',
		action = '',
		class: className = '',
		children,
		...restProps
	}: Props = $props();

	async function handleSubmit() {
		try {
			// disable submitButtons
			setSubmitButtonDisableState(true);

			return async ({ result }) => {
				if (result.type === 'redirect') {
					goto(result.location);
				} else {
					await applyAction(result); // updates form variable
					await invalidateAll(); // causes reloading data from the server
				}

				// enable submitButtons after form action
				setSubmitButtonDisableState(false);

				// display toast if returned
				const toastData: Toast = result.data?.toast;
				if (toastData) {
					if (toastData.type === 'success') {
						toast.success(toastData.title, {
							description: toastData.description
						});
					} else if (toastData.type === 'info') {
						toast.info(toastData.title, {
							description: toastData.description
						});
					} else if (toastData.type === 'warning') {
						toast.warning(toastData.title, {
							description: toastData.description
						});
					} else if (toastData.type === 'error') {
						toast.error(toastData.title, {
							description: toastData.description
						});
					} else {
						toast(toastData.title, {
							description: toastData.description
						});
					}
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
