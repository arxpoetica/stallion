<div class="layout">
	<Header segment={segment || 'home'}/>
	<main class={$session.user ? 'private' : 'public'}>
		{#if $session.user}
			<Sidebar/>
			<div class="content">
				<slot></slot>
			</div>
		{:else}
			<slot></slot>
		{/if}
	</main>
</div>

<script>
	import { afterUpdate, onMount } from 'svelte'
	import { getSession } from '@sapper/app'
	import { target } from '../stores/app-store.js'
	import Header from '../components/layout/Header.svelte'
	import Sidebar from '../components/layout/Sidebar.svelte'

	const session = getSession()
	const { user } = $session

	let html$
	if (process.browser) { html$ = document.querySelector('html') }

	export let segment
	$: section = segment ? segment.split('/')[0] : 'home'
	let priorSection
	afterUpdate(() => {
		if (section !== priorSection) {
			if (priorSection) {
				html$.classList.remove(`${priorSection}-page`)
			}
			html$.classList.add(`${section}-page`)
			priorSection = section
		}
	})

	onMount(async () => {
		// DOM ONLY STUFF ---------- >>>>
		// TODO: move to `<svelte:window>` or `<svelte:body>` ????
		document.addEventListener('click', event => target.set(event.target))
		html$.classList.add(user ? 'auth' : 'no-auth')
		setTimeout(() => html$.classList.remove('unloaded'), 150)

		// // TODO: eliminate this code
		// try {
		// 	const registrations = await navigator.serviceWorker.getRegistrations()
		// 	if (registrations.length) {
		// 		for (let registration of registrations) {
		// 			console.log('Unregistering service worker.')
		// 			registration.unregister()
		// 		}
		// 	}
		// } catch (error) {
		// 	console.log(error)
		// 	console.log('Error unregistering service workers.')
		// }
	})
</script>

<style type="text/scss">
	:global {
		html {
			opacity: 1;
			transition: opacity 0.1s ease-in-out;
			&.unloaded {
				opacity: 0;
			}
			&.no-auth .layout {
				padding-top: $header-height-noauth;
				@media (--small) { padding-top: 0; }
			}
			&.home-page.no-auth {
				.layout { padding-top: 0; }
				main {
					max-width: none;
					padding: 0;
				}
			}
		}
	}
	.layout {
		position: relative;
		padding-top: $header-height;
	}
	main {
		margin: 0 auto;
		width: 100%;
		max-width: $max;
		padding: 40px 20px 20px;
		&.private {
			display: flex;
		}
	}
	.content {
		flex: 1 0 calc(100% - resolve($sidebar-width + 2rem));
		min-width: 0;
	}
	@media (--small) {
		.layout {
			display: flex;
			flex-direction: column;
			padding-top: 0;
		}
		main {
			position: relative;
			flex: 1 0 100%;
		}
	}
</style>
