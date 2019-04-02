<h1>Content Types</h1>

<List {items} {actions}/>

<script>
	import List from '../../components/List.svelte'
	import { contents } from '../../stores/app-store'

	$: items = $contents.map(content => {
		return {
			id: content.id,
			url: `/contents/${content.name}`,
			editUrl: `/contents/edit/${content.name}`,
			name: content.name,
			description: content.description,
		}
	})

	import { POST } from '../../_server/utils/loaders'
	const actions = {
		remove: async item => {
			await POST('/api/contents/delete.json', { _key: item.id, name: item.name })
			const index = $contents.findIndex(col => col.id === item.id)
			contents.update(arr => {
				arr.splice(index, 1)
				return arr
			})
		},
	}
</script>

<!-- <style type="text/scss">
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
</style> -->
