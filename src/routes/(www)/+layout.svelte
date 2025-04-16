<script lang="ts">
	import '../../app.css';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	onMount(async () => {
		(await import('fslightbox')).default;
	});

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

<div class="pattern"></div>
<Header />
<main
	class="mx-auto min-h-[calc(100vh-64px-256px)] max-w-4xl px-4 py-12 sm:px-16 sm:px-6 lg:min-h-[calc(100vh-64px-128px)] lg:px-8 lg:py-16"
>
	{@render children()}
</main>
<Footer />

<style>
	.pattern {
		position: absolute;
		z-index: -10;
		width: 100vw;
		height: 100vh;
		background-color: #ffffff;
		opacity: 0.5;
		background-image:
			repeating-radial-gradient(circle at 0 0, transparent 0, #ffffff 21px),
			repeating-linear-gradient(#f4f4f555, #f4f4f5);
	}

	.pattern::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%);
	}

	:global(.prose details > summary) {
		font-size: 90%;
		font-weight: 600;
		cursor: pointer;
		margin-bottom: 1rem;
	}

	:global(.prose details > summary::-webkit-details-marker) {
		display: none;
	}

	:global(.prose details div:first-of-type) {
		font-size: 90%;
		@apply rounded-lg border bg-card p-6 text-card-foreground shadow-sm;
	}

	:global(.prose img) {
		@apply rounded-2xl border border-gray-200 object-contain shadow-sm;
	}

	:global(.prose p:has(img) > em) {
		@apply -mt-4 block text-sm text-muted-foreground;
	}
</style>
