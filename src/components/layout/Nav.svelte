<nav class="{$session.user ? '' : 'no-auth'}">
	<ul>
		{#if $session.user}
			<NavMenu {segment}/>
			<li class="action link logout"><a href="/auth/logout" on:click={logout}>Log Out</a></li>
		{:else}
			<li class="link login"><a href="/login">Log In</a></li>
		{/if}
	</ul>
</nav>

<script>
	export let segment
	import NavMenu from './NavMenu.svelte'
	import { getSession } from '@sapper/app'
	const session = getSession()
	async function logout(event) {
		event.preventDefault()
		await fetch('auth/logout', { method: 'POST' })
		window.location.reload(true)
	}
</script>

<style type="text/scss">
	nav {
		display: flex;
		align-items: center;
	}
	ul {
		display: flex;
		align-items: center;
	}
	li {
		display: flex;
		margin: 0 2px;
		a {
			height: 28px;
			padding: 0 8px;
			border-radius: 1px;
			color: $black;
			line-height: 2.8rem;
			text-decoration: none;
			transition: background-color 0.15s ease-in-out;
			&:hover,
			&:focus {
				background-color: $yellow-light;
			}
		}
		&[data-on=true] a {
			background-color: $yellow-light;
			color: $black;
			font-weight: $bold;
			cursor: default;
		}
		&.action a {
			background-color: $yellow-main;
			color: black;
			font-weight: $bold;
			opacity: 0.7;
			transition: opacity 0.15s ease-in-out;
			&:hover,
			&:focus {
				opacity: 1;
			}
		}
		&.logout {
			display: none;
		}
	}
	.no-auth {
		font-weight: $bold;
		li {
			&.login a {
				background-color: $yellow-l3;
				transition: background-color 0.15s ease-in-out;
				&:hover {
					background-color: $yellow-l1;
				}
			}
			// &.signup a {
			// 	background-color: $yellow-l2;
			// 	// color: $white;
			// 	transition: background-color 0.15s ease-in-out;
			// 	&:hover {
			// 		background-color: $yellow-main;
			// 	}
			// }
		}
	}
	@media (--small) {
		nav {
			justify-content: center;
			margin-bottom: 2rem;
		}
		li.logout {
			display: flex;
		}
	}
</style>
