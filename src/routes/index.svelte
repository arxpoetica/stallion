<svelte:head><title>Stallion - Home</title></svelte:head>

{#if $session.user}
	<Private/>
{:else}
	<Public/>
{/if}

<script>
	import { getSession } from '@sapper/app'
	import Private from './_home-private.svelte'
	import Public from './_home-public.svelte'
	const session = getSession()
</script>
