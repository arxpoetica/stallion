<li bind:this={menu} class="menu {open ? 'open' : 'shut'}">
	<div class="target" on:click={openMenu}>
		<div class="avatar" style="background-image: url({$session.user.avatar});"></div>
		<div class="arrow"></div>
	</div>
	<div class="dropdown">
		<ul>
			{#if $session.user && $session.user.plan === 'admin'}
				<li><h2>Admin</h2></li>
				<li><a href="/settings/admin/users">Users</a></li>
				{#if $session.env === 'development'}
					<li><a href="/settings/admin/collections">Collections</a></li>
					<li><a href="/api/pure-graphql" target="_blank">API</a></li>
				{/if}
				<li class="div"></li>
			{/if}
			{#if $session.user && $session.user.plan === 'admin'}
				<li><h2>User</h2></li>
			{/if}
			<li><a href="/st/{$session.user.username}">Profile</a></li>
			<li><a href="/settings/account/profile">Settings</a></li>
			<li class="div"></li>
			<li><a href="/auth/logout" on:click={logout}>Log Out</a></li>
		</ul>
	</div>
</li>

<script>
	import { beforeUpdate, onMount } from 'svelte'
	import { page, getSession } from '@sapper/app'
	const session = getSession()

	let open = false
	let priorPath = $page.path
	beforeUpdate(() => {
		if ($page.path !== priorPath && open) {
			open = false
			priorPath = $page.path
		}
	})

	let menu
	import { target } from '../../stores/app-store.js'
	onMount(() => {
		// const listener = this.store.on('state', ({ current }) => {
		target.subscribe(clickedTarget => {
			if (clickedTarget && open) {
				if (menu.contains(clickedTarget)) { return }
				open = false
			}
		})
		// this.on('destroy', listener.cancel)
	})

	function openMenu() {
		open = !open
	}
	async function logout(event) {
		event.preventDefault()
		await fetch('auth/logout', { method: 'POST' })
		window.location.reload(true)
	}
</script>

<style type="text/scss">
	.menu {
		position: relative;
		margin: 0 0 0 10px;
		font: 1.5rem/1 $font;
		cursor: pointer;
		&:hover,
		&:focus {
			.arrow {
				opacity: 1;
			}
		}
	}
	.target {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.avatar {
		width: 40px;
		height: 40px;
		background: none no-repeat center gray;
		background-size: cover; // border-radius: 100%;
		// clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
		/* clip-path: url('/svg/logo-header.svg'); */
		border-radius: 100%;
	}
	.arrow {
		width: 12px;
		height: 6px;
		background: url('/svg/arrow-down.svg') no-repeat center transparent;
		opacity: 0.7;
		z-index: 1;
	}
	.dropdown {
		position: absolute;
		top: -999em;
		left: -999em;
		background-color: white;
		width: auto;
		min-width: 160px;
		margin-top: 12px;
		border: 1px solid rgba(0, 0, 0, 0.3);
		// border-radius: 3px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
		z-index: $z-front;
	}
	.open {
		.arrow {
			opacity: 1;
		}
		.dropdown {
			top: 100%;
			right: 0;
			left: auto;
		}
	}
	ul {
		padding: 0.5rem 0;
	}
	li {
		&.div {
			margin: 0.5rem 0;
			height: 1px;
			background-color: $gray-6;
		}
	}
	h2 {
		margin: -0.5rem 0 0.5rem;
		padding: 0.6rem 1rem;
		font-size: inherit;
		background-color: $gray-light;
		border-bottom: 1px solid $gray-6;
		cursor: default;
	}
	a {
		display: block;
		padding: 0.2rem 1rem;
		color: $black;
		text-decoration: none;
		&:hover {
			// background-color: $yellow-main;
			background-color: $gray-light;
		}
	}
	@media (--small) {
		.menu {
			display: none;
		}
	}
</style>
