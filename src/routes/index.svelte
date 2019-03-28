<svelte:head><title>Stallion - Home</title></svelte:head>

{#if $session.user}
	<Private/>
{:else}
	<Public/>
{/if}

<script context="module">
	import { graphQuery } from './_services/loaders.js'
	export async function preload() {
		const { users } = await graphQuery(this.fetch, '{ users { username } }')
		return { not_set_up: !users.length }
	}
</script>

<script>
	import { beforeUpdate } from 'svelte'
	import { goto, getSession } from '@sapper/app'
	import Private from './_home-private.svelte'
	import Public from './_home-public.svelte'

	export let not_set_up
	const session = getSession()

	beforeUpdate(() => {
		if (not_set_up) {
			goto('/setup', { replaceState: true })
		}
	})
</script>
