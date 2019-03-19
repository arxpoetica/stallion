<div class="content">
	<h1>Stallion</h1>
	<h2>Headless CMS built atop Svelte and Sapper.</h2>
	<LogoPublic/>
</div>

<script>
	import LogoPublic from '../_client/svg/compiled/logo-public.svg'
</script>

<style type="text/scss">
	.content {
		max-width: 50rem;
		margin: 0 auto;
		padding: resolve($header-height-noauth + 50px) 2rem 2rem;
		text-align: center;
	}
	h1 {
		margin: 0 0 2rem;
		font: 6.4rem/7.7rem $font;
	}
	h2 {
		margin: 0 0 5rem;
	}
	@media (--small) {
		h1 {
			margin-top: 1rem;
			font: 5rem/1.2 $font;
		}
	}
</style>
