<div class="bg">
	<div class="wrap">
		<div class="content">
			<h1>Headless CMS built atop Svelte and Sapper.</h1>
			<!-- <a href="/signup/email" class="button large">Sign up to learn and do more.</a> -->
		</div>
	</div>
</div>

<!-- <script></script> -->

<style type="text/scss">
	.bg {
		position: relative;
		// margin-top: resolve($header-height-noauth + 18px);
		margin-top: $header-height-noauth;
		background-color: $bg2;
		background-color: tinycolor($bg2, setAlpha, 0.7);
		font: 2.6rem/1.2 $font;
		// svg {
		// 	transform: rotateZ(180deg);
		// }
	}
	.wrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: absolute;
		top: 10rem;
		right: 10rem;
		bottom: 10rem;
		left: 10rem;
		// background-color: rgba(255, 255, 255, 0.3);
		// border: 2px solid white;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 60rem;
		margin: 0 auto;
		padding: 20px;
	}
	h1 {
		margin: 0 0 2rem;
		font: 6.4rem/7.7rem $font;
		// font: 6rem/7.7rem 'Libre Franklin';
		text-align: center;
	}
	@media (--small) {
		.bg {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			padding-top: 0;
			min-height: 0;
			height: 100%;
		}
		.bg,
		.content {
			display: block;
		}
		h1 {
			margin-top: 1rem;
			font: 5rem/1.2 $font;
		}
	}
</style>
