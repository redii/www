<div class="pattern"></div>

<style>
	.pattern {
		position: absolute;
		z-index: -10;
		width: 100vw;
		background-color: #ffffff;
		opacity: 0.6;
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

	@media only screen and (max-width: 1250px) {
		.pattern {
			height: 150vh;
		}
	}

	@media only screen and (min-width: 1250px) {
		.pattern {
			height: 100vh;
		}
	}
</style>
