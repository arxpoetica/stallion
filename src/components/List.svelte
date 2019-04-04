<ul>
	{#each items as item}
		<li>
			<div class="head">
				<h2><a href={item.url}>{item.name}</a></h2>
				{#if item.description}
					<p>{item.description}</p>
				{/if}
			</div>
			{#if $session.user.role === 'admin'}
				<div class="buttons">
					<a class="btn small warning" href={item.editUrl}>Edit</a>
					{#if actions.remove}
						<button class="btn small alert" on:click={() => remove(item)}>Delete</button>
					{/if}
				</div>
			{/if}
		</li>
	{/each}
</ul>

<script>
	import { getSession } from '@sapper/app'
	const session = getSession()

	export let items = []
	export let actions = {}
	function remove(item) {
		if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
			actions.remove(item)
		}
	}
</script>

<style type="text/scss">
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		font: 1.6rem/1.2 $font;
	}
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 0 0.5rem;
		padding: 1rem;
		background-color: $gray-light;
		border: 1px solid $gray-6;
		border-radius: 3px;
		// transition: background-color 0.15s ease-in-out;
		// &:hover {
		// 	background-color: $gray-7;
		// }
	}
	.head {
		padding-right: 1rem;
	}
	h2 {
		margin: 0;
		font: $bold 1.6rem/1.2 $font;
	}
	p {
		margin: 1.2rem 0 0;
		font: 1.3rem $font;
	}
</style>
