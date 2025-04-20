<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Pattern from '$lib/components/Pattern.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	let { children } = $props();
</script>

<svelte:head>
	<title>Henry Akmann</title>
	<meta name="description" content="Henry Akmann - Meine Webseite für verschiedenes Zeug..." />
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

<Pattern />
<Header />
<main
	class="mx-auto min-h-[calc(100vh-64px-256px)] max-w-4xl px-4 py-12 sm:px-16 sm:px-6 lg:min-h-[calc(100vh-64px-128px)] lg:px-8 lg:py-16"
>
	{@render children()}
</main>
<Footer />
<Toaster richColors />
