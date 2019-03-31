<div class="sidebar">
	<nav class="menu">
		<h2>
			<a href="/collections">Collections</a>
			<a href="/collections/create">Create +</a>
		</h2>
		{#each $collections as collection}
			<!-- <a href="/collections/{collection.name}" data-on="{section === 'users'}">Users</a> -->
			<a class="link" href="/collections/{collection.name}">{collection.name}</a>
		{/each}
		<h2>Settings</h2>
		<a class="link" href="/settings/account/profile" data-on="{section === 'profile'}">Profile</a>
	</nav>
</div>

<script>
	import { onMount } from 'svelte'
	import { getSession } from '@sapper/app'
	const session = getSession()

	export let section
	export let segment

	import { GET } from '../../_server/utils/loaders'
	import { collections } from '../../stores/app-store'
	onMount(async () => {
		const list = await GET('/api/collections/list.json')
		list.sort((a, b) => a.name.localeCompare(b.name))
		collections.set(list)
	})
</script>

<style type="text/scss">
	.sidebar {
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		padding: 1rem 1.2rem;
		border-bottom: 1px solid $gray-6;
		background-color: $gray-light;
		font: $bold 1.3rem/1 $font;
		cursor: default;
	}
	.link {
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
