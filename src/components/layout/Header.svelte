<header class="{$session.user ? '' : 'no-auth'}">
	<div class="header-evil-wrap">
		<a class="logo" href="/">
			<div class="ghost">Stallion</div>
			<!-- {#if $session.user}
				<AuthLogo/>
			{:else}
				<NoAuthLogo/>
			{/if} -->
		</a>
		<Nav {segment}/>
	</div>
</header>

<script>
	export let segment

	import { getSession } from '@sapper/app'
	const session = getSession()

	import Nav from './Nav.svelte'
	// import AuthLogo from '../../_client/svg/compiled/logo-header.svg'
	// import NoAuthLogo from '../../_client/svg/compiled/logo-header-noauth.svg'
</script>

<style type="text/scss">
	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: $bg2;
		color: $black;
		font: $bold 1.5rem/1 $font;
		z-index: $z-front;
		&.no-auth {
			background-color: $bg2;
			color: $black;
			.header-evil-wrap {
				height: $header-height-noauth;
			}
			.logo {
				flex-basis: 28.3rem;
				max-width: 28.3rem;
			}
		}
	}
	.header-evil-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// max-width: $max;
		height: $header-height;
		margin: 0 auto;
		padding: 0 20px;
	}
	.logo {
		display: block;
		flex-basis: 21.3rem;
		max-width: 21.3rem;
	}
	@media (--small) {
		header {
			position: relative;
			&.no-auth .header-evil-wrap {
				height: auto;
			}
		}
		.header-evil-wrap {
			display: block;
			height: auto;
		}
		.logo {
			margin: 2rem auto;
		}
	}
</style>
