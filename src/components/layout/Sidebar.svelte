<div class="side">
	<nav class="menu">
		<h2>Collections</h2>
		{#each collections as collection}
			<!-- <a href="/collection/{collection.name}" data-on="{section === 'users'}">Users</a> -->
			<a href="/collection/{collection.name}">{collection.name}</a>
		{/each}
		<h2>Settings</h2>
		<a href="/settings/account/profile" data-on="{section === 'profile'}">Profile</a>
		<!-- <span>{child.props.path}</span> -->
		<!-- <span>{section}</span> -->
	</nav>
</div>

<script>
	import { onMount } from 'svelte'
	import { getSession } from '@sapper/app'
	const session = getSession()

	import { GET } from '../../_server/utils/loaders.js'

	let collections = []
	onMount(async () => {
		collections = await GET('/api/collections/list.json')
		console.log(collections)
	})

	export let section
	export let segment
</script>

<style type="text/scss">
	.dash {
		display: flex;
		margin: 0 0 50px;
		text-align: center;
		h1 {
			margin: 0;
			font-size: 4rem;
		}
		h2 {
			font-weight: $normal;
		}
	}
	.side {
		position: relative;
		flex: 0 0 $sidebar-width;
		margin: 0 2rem 0 0;
	}
	.menu {
		position: fixed;
		width: $sidebar-width;
		font: 1.4rem/1 $font;
		background-color: white;
		border: 1px solid $gray-6;
	}
	h2 {
		margin: 0;
		padding: 1rem 1.2rem;
		border-bottom: 1px solid $gray-6;
		background-color: $gray-light;
		font: $bold 1.3rem/1 $font;
		cursor: default;
	}
	a {
		display: block;
		padding: 1rem 1.2rem;
		border-bottom: 1px solid $gray-6;
		color: $black;
		text-decoration: none;
		&:last-child {
			border: 0;
		}
		&:hover {
			background-color: $green-l5;
		}
		&[data-on="true"] {
			padding-left: 1rem;
			border-left: 2px solid $green-main;
			font-weight: $bold;
		}
	}
</style>
