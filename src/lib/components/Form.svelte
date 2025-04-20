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
			return async ({ result }) => {
				if (result.type === 'redirect') {
					goto(result.location);
				} else {
					await applyAction(result); // updates form variable
					await invalidateAll(); // causes reloading data from the server
				}

				// display notification if returned
				const notification = result.data?.notification;
				if (notification) {
					if (notification.type === 'success') {
						toast.success(notification.title, {
							description: notification.description
						});
					} else if (notification.type === 'info') {
						toast.info(notification.title, {
							description: notification.description
						});
					} else if (notification.type === 'warning') {
						toast.warning(notification.title, {
							description: notification.description
						});
					} else if (notification.type === 'error') {
						toast.error(notification.title, {
							description: notification.description
						});
					} else {
						toast(notification.title, {
							description: notification.description
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
