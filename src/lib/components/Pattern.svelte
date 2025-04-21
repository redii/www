<div class="pattern"></div>

<style>
	:global(.pattern) {
		position: absolute;
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
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%);
	}

	:global(.dark .pattern) {
		position: absolute;
		z-index: -10;
		height: 100vh;
		width: 100vw;
		background-color: #000;
		opacity: 0.6;
		background-image:
			repeating-radial-gradient(circle at 0 0, transparent 0, #000 21px),
			repeating-linear-gradient(#30303055, #171717);
	}

	:global(.dark .pattern::after) {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgb(0, 0, 0) 100%);
	}
</style>
