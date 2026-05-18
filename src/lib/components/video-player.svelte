<script lang="ts">
	import { cn } from '$lib/utils/shadcn.js';
	import Play from '@lucide/svelte/icons/play';
	import Pause from '@lucide/svelte/icons/pause';
	import Volume2 from '@lucide/svelte/icons/volume-2';
	import VolumeX from '@lucide/svelte/icons/volume-x';
	import Maximize from '@lucide/svelte/icons/maximize';
	import Minimize from '@lucide/svelte/icons/minimize';

	interface Props {
		src: string;
		poster?: string;
		class?: string;
	}

	let { src, poster, class: className }: Props = $props();

	let videoEl = $state<HTMLVideoElement>();
	let containerEl = $state<HTMLDivElement>();

	let paused = $state(true);
	let muted = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	let isFullscreen = $state(false);
	let controlsVisible = $state(true);
	let canHover = $state(false);
	let posterVisible = $state(true);
	let idleTimer: ReturnType<typeof setTimeout> | null = null;

	function showControls() {
		controlsVisible = true;
		if (idleTimer) clearTimeout(idleTimer);
		if (canHover && !paused) {
			idleTimer = setTimeout(() => (controlsVisible = false), 2500);
		}
	}

	function togglePlay() {
		if (!videoEl) return;
		if (videoEl.paused) videoEl.play();
		else videoEl.pause();
	}

	function toggleMute() {
		if (videoEl) videoEl.muted = !videoEl.muted;
	}

	async function toggleFullscreen() {
		if (!document.fullscreenElement) await containerEl?.requestFullscreen();
		else await document.exitFullscreen();
	}

	function onSeek(e: Event) {
		const value = +(e.target as HTMLInputElement).value;
		if (videoEl) videoEl.currentTime = value;
	}

	function formatTime(s: number) {
		if (!s || !isFinite(s)) return '0:00';
		const m = Math.floor(s / 60);
		const r = Math.floor(s % 60)
			.toString()
			.padStart(2, '0');
		return `${m}:${r}`;
	}

	$effect(() => {
		canHover = window.matchMedia('(hover: hover)').matches;
		function onFs() {
			isFullscreen = !!document.fullscreenElement;
		}
		document.addEventListener('fullscreenchange', onFs);
		return () => {
			document.removeEventListener('fullscreenchange', onFs);
			if (idleTimer) clearTimeout(idleTimer);
		};
	});

	$effect(() => {
		paused;
		showControls();
	});
</script>

<div
	bind:this={containerEl}
	class={cn('group relative inline-block bg-black', className)}
	role="region"
	aria-label="Videoplayer"
	onmousemove={showControls}
	ontouchstart={showControls}
>
	{#if poster}
		<img
			src={poster}
			alt=""
			aria-hidden="true"
			class={cn('block max-h-full max-w-full', !posterVisible && 'hidden')}
		/>
	{/if}
	<!-- svelte-ignore a11y_media_has_caption -->
	<video
		bind:this={videoEl}
		bind:currentTime
		bind:duration
		bind:paused
		bind:muted
		onclick={togglePlay}
		onplaying={() => (posterVisible = false)}
		class={cn(
			'block max-h-full max-w-full',
			posterVisible && poster && 'absolute inset-0 h-full w-full opacity-0'
		)}
	>
		<source {src} type="video/mp4" />
	</video>

	<div
		class={cn(
			'absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-3 pt-6 pb-3 text-white transition-opacity duration-300',
			!controlsVisible && 'pointer-events-none opacity-0'
		)}
	>
		<button
			type="button"
			onclick={togglePlay}
			aria-label={paused ? 'Abspielen' : 'Pausieren'}
			class="shrink-0 cursor-pointer p-1"
		>
			{#if paused}
				<Play class="size-5" />
			{:else}
				<Pause class="size-5" />
			{/if}
		</button>
		<span class="shrink-0 font-mono text-xs tabular-nums">
			{formatTime(currentTime)} / {formatTime(duration)}
		</span>
		<input
			type="range"
			min={0}
			max={duration || 0}
			step={0.01}
			value={currentTime}
			oninput={onSeek}
			aria-label="Position"
			class="h-1 min-w-0 flex-1 cursor-pointer accent-white"
		/>
		<button
			type="button"
			onclick={toggleMute}
			aria-label={muted ? 'Ton an' : 'Ton aus'}
			class="shrink-0 cursor-pointer p-1"
		>
			{#if muted}
				<VolumeX class="size-5" />
			{:else}
				<Volume2 class="size-5" />
			{/if}
		</button>
		<button
			type="button"
			onclick={toggleFullscreen}
			aria-label={isFullscreen ? 'Vollbild verlassen' : 'Vollbild'}
			class="shrink-0 cursor-pointer p-1"
		>
			{#if isFullscreen}
				<Minimize class="size-5" />
			{:else}
				<Maximize class="size-5" />
			{/if}
		</button>
	</div>
</div>
