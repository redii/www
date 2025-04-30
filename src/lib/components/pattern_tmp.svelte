<div class="pattern"></div>

<style>
	:global(.pattern) {
		position: fixed;
		top: 0;
		z-index: -10;
		height: 100vh;
		width: 100vw;
		background-color: #ffffff;
		opacity: 0.6;
		background-image:
			repeating-radial-gradient(circle at 0 0, transparent 0, #ffffff 21px),
			repeating-linear-gradient(#f4f4f555, #f4f4f5);
	}

	:global(.pattern::after) {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 1) 100%);
	}

	:global(.dark .pattern) {
		background-color: rgb(9, 9, 11);
		background-image:
			repeating-radial-gradient(circle at 0 0, transparent 0, rgb(9, 9, 11) 21px),
			repeating-linear-gradient(rgb(16, 16, 16), rgb(12, 12, 12));
	}

	:global(.dark .pattern::after) {
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgb(9, 9, 11) 100%);
	}
</style>
