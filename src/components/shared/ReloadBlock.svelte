<div class="reload">
	<h1>Changes have been applied.</h1>
	<h2>Please restart your app.</h2>
</div>

<style type="text/scss">
	.reload {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(255, 255, 255, 0.85);
		z-index: $z-absolute-front;
	}
	h1 {
		font: 5rem $font;
	}
	h2 {
		margin: 0;
		font: 3rem $font;
	}
</style>
