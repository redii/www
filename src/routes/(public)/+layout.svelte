<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Pattern from '$lib/components/pattern.svelte';
	import PageTransition from '$lib/components/page-transition.svelte';
	import RedirectToast from '$lib/components/redirect-toast.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import LightboxOverlay from '$lib/components/lightbox/LightboxOverlay.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<Header />
<PageTransition>
	<main
		class="mx-auto min-h-[calc(100vh-64px-256px)] max-w-4xl px-6 py-12 sm:px-8 lg:min-h-[calc(100vh-64px-128px)] lg:px-10 lg:py-16"
	>
		<Breadcrumbs />
		{@render children()}
	</main>
</PageTransition>
<Footer />

<Pattern />
<ModeWatcher defaultMode="light" />
<Toaster />
<RedirectToast />
<LightboxOverlay />
