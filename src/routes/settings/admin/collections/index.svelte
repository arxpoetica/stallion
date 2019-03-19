<h1>Collections</h1>

<!-- {JSON.stringify(collections)} -->

<h2>Node Collections</h2>
<ul>
	{#each collections.nodes as node}
		<li><a href="/settings/admin/collections/{node.name}">{node.name}</a></li>
	{/each}
</ul>

<h2>Edge Collections</h2>
<ul>
	{#each collections.edges as edge}
		<li><a href="/settings/admin/collections/{edge.name}">{edge.name}</a></li>
	{/each}
</ul>

<script context="module">
	import { post } from '../_actions/helpers.js'
	export async function preload({ params }) {
		const json = await post(this.fetch, { action: 'collections.list' })
		const collections = json.reduce((collections, collection) => {
			if (collection.type === 2) {
				collections.nodes.push(collection)
			} else {
				collections.edges.push(collection)
			}
			return collections
		}, { nodes: [], edges: [] })
		collections.nodes.sort((a, b) => a.name.localeCompare(b.name))
		collections.edges.sort((a, b) => a.name.localeCompare(b.name))
		return { collections }
	}
</script>
<script>
	export let collections
</script>

<style type="text/scss">
	ul {
		list-style: none;
		margin: 0 0 2rem;
		padding: 0;
		font: 1.6rem/1.2 $font;
	}
	li {
		margin: 0 0 0.5rem;
	}
	a {
		display: block;
		padding: 1rem;
		background-color: $gray-light;
		border: 1px solid $gray-6;
		border-radius: 3px;
		text-decoration: none;
		transition: background-color 0.15s ease-in-out;
		&:hover {
			background-color: $gray-7;
		}
	}
</style>
