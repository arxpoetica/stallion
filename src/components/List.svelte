<ul>
	{#each items as item}
		<li>
			<div class="head">
				<h2>{item.name}</h2>
				<div class="buttons">
					<a class="btn small" href={item.url}>Edit</a>
					{#if actions.remove}
						<button class="btn small alert" on:click={() => remove(item.name)}>Delete</button>
					{/if}
				</div>
			</div>
			{#if item.description}
				<p>{item.description}</p>
			{/if}
		</li>
	{/each}
</ul>

<script>
	export let items = []
	export let actions = {}
	function remove(name) {
		if (confirm(`Are you sure you want to delete "${name}"?`)) {
			// TODO: this should maybe be an `id`
			actions.remove(name)
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
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	h2 {
		margin: 0;
		font: $bold 1.6rem/1.2 $font;
	}
	a {
		// display: block;
		text-decoration: none;
	}
</style>
