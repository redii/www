<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Pattern from '$lib/components/Pattern.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { House } from 'lucide-svelte';

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
<ModeWatcher />
<Toaster richColors />

<Header />
<main
	class="mx-auto min-h-[calc(100vh-64px-256px)] max-w-4xl px-4 py-12 sm:px-16 sm:px-6 lg:min-h-[calc(100vh-64px-128px)] lg:px-8 lg:py-16"
>
	{#if page.url.pathname !== '/' && page.data.hideBreadcrumbs !== true && !page.error}
		<Breadcrumb.Root class="mb-8">
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/">
						<House size={16} />
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				{#each page.url.pathname.split('/').slice(1) as slug, index}
					{@const itemUrl = '/' + [...page.url.pathname.split('/').slice(1, index + 2)].join('/')}
					{@const isLastItem = index === page.url.pathname.split('/').length - 2}
					{#if isLastItem}
						<Breadcrumb.Page>{page.data.title || slug}</Breadcrumb.Page>
					{:else}
						<Breadcrumb.Item>
							<Breadcrumb.Link href={itemUrl}>{slug}</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
					{/if}
				{/each}
			</Breadcrumb.List>
		</Breadcrumb.Root>
	{/if}
	{@render children()}
</main>
<Footer />
