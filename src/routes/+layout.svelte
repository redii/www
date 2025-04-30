<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Pattern from '$lib/components/pattern.svelte';
	import PageTransition from '$lib/components/page-transition.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<title>Henry Akmann</title>
	<meta name="description" content="Henry Akmann - Meine Webseite für alles mögliche..." />
	<link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
	<link rel="shortcut icon" href="/favicon/favicon.ico" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
	<link rel="manifest" href="/favicon/site.webmanifest" />
	<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5b7bd5" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="msapplication-config" content="/favicon/browserconfig.xml" />
	<meta name="theme-color" content="#FFFFFF" />
</svelte:head>

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
<ModeWatcher />
<Toaster richColors />
