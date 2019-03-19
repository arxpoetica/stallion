<h1>Collection: {$page.params.collection}</h1>

<!-- {JSON.stringify(dataset)} -->
<!-- {console.log(dataset)} -->

{#if dataset.length}
	{#each dataset as set}
		<h2>{set._key}</h2>
		<pre>{JSON.stringify(set, undefined, 2)}</pre>
	{/each}
{:else}
	<h2>There is no data in this collection.</h2>
{/if}

<script context="module">
	import { post } from '../_actions/helpers.js'
	export async function preload({ params }) {
		const dataset = await post(this.fetch, { key: params.collection, action: 'collections.getData' })
		return { dataset }
	}
</script>
<script>
	import { page } from '@sapper/app'
	export let dataset
</script>

<style type="text/scss">
	h2 {
		margin: 0 0 0.5rem;
		font: $bold 1.5rem/1.2 $font;
	}
	pre {
		margin: 0 0 2rem;
		// white-space: pre-wrap;
	}
</style>
