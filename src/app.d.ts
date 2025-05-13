// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Toast {
		type: 'default' | 'info' | 'success' | 'warning' | 'error';
		title: string;
		description: string;
	}
}

export {};
