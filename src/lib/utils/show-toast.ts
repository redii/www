import { toast } from 'svelte-sonner';

export function showToast(data: Toast) {
	const opts = { description: data.description };
	switch (data.type) {
		case 'success':
			return toast.success(data.title, opts);
		case 'info':
			return toast.info(data.title, opts);
		case 'warning':
			return toast.warning(data.title, opts);
		case 'error':
			return toast.error(data.title, opts);
		default:
			return toast(data.title, opts);
	}
}
