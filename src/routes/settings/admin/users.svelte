<h1>Users</h1>

{#if items && items.length}
	<div class="list">
		{#each items as item}
			<ListItem id={item.id} type="user" {item} on:delete={deleteUser}/>
		{/each}
	</div>
{/if}

<script context="module">
	import { graphQuery } from '../../_services/loaders.js'
	export async function preload({ params }) {
		const { users } = await graphQuery(this.fetch, '{ users { username email bio avatar last first displayName } }')
		return { users }
	}
</script>

<script>
	import ListItem from '../../../components/settings/ListItem.svelte'
	export let users

	$: items = users.map(user => {
		return {
			id: user.username,
			title: user.username,
			// subtitle: user.email,
			// description: user.bio,
			fields: user,
		}
	})

	function deleteUser(event) {
		// TODO: DELETE THE USER CAREFULLY
		console.log('delete user ', event.detail.id)
	}
</script>

<!-- <style type="text/scss"></style> -->
