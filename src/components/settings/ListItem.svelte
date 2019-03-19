<div class="item" data-edit={edit}>
	<div class="content">
		<h2>{item.title}</h2>
		{#if item.subtitle}
			<h3>{item.subtitle}</h3>
		{/if}
		{#if item.description}
			<div class="detail">{@html item.description}</div>
		{/if}
		{#if item.code}
			<pre><code>{item.code}</code></pre>
		{/if}
		{#if fields.length}
			<table>
				{#each Object.keys(item.fields) as key}
					<tr>
						<td>{key}</td>
						<td><input type="text" value={item.fields[key]} disabled={!edit}/></td>
					</tr>
				{/each}
			</table>
		{/if}
	</div>
	<div class="buttons actions">
		<div class="button tiny" on:click={() => edit = !edit}>Edit</div>
		<div class="button alert tiny" on:click={() => deleteTry = true}>Delete</div>
	</div>
	{#if deleteTry}
		<div class="delete-actions">
			<h2>Are you sure you want to delete <br>{type} `{id}`?</h2>
			<p class="warning">This action cannot be undone!</p>
			<div class="buttons">
				<button bind:this={cancel$} class="button" on:click={() => deleteTry = false}>Cancel!</button>
				<button class="button alert" on:click={() => dispatch('delete', { id })}>Delete</button>
			</div>
		</div>
	{/if}
</div>

<script>
	import { afterUpdate, createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let id
	export let type
	export let item = {}
	let edit = false
	let deleteTry = false
	let cancel$

	$: fields = item.fields ? Object.keys(item.fields) : {}

	afterUpdate(() => {
		if (deleteTry) {
			cancel$.focus()
		}
	})
</script>

<style type="text/scss">
	.item {
		display: flex;
		justify-content: space-between;
		position: relative;
		margin: 0 0 1rem;
		padding: 1rem;
		background-color: white;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.05);
	}
	.content {
		flex: 0 0 calc(100% - 70px);
		min-width: 0;
	}
	.actions {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		flex: 0 0 60px;
		margin: 0 0 0 10px;
	}
	// .buttons {
	// }
	.button {
		display: block;
		margin: 5px 0 0;
	}
	h2 {
		overflow: hidden;
		margin: 0 0 0.2rem;
		text-overflow: ellipsis;
	}
	h3 {
		margin: 0;
		color: $gray-3;
		font: 1.2rem/1.2 $font;
		text-transform: uppercase;
	}
	.detail {
		margin: 1rem 0 0;
	}
	table {
		width: 100%;
		margin: 1.2rem 0 0;
		background-color: white;
		border: 0;
		color: #777;
		border-collapse: collapse;
		border-spacing: 0;
		font: 1.1rem/1.6rem $table-font;
	}
	// tr {}
	td {
		// padding: 3px 4px;
		// border: 1px solid #ccc;
		&:first-child {
			width: 1px;
			padding-right: 8px;
			text-align: right;
		}
		input {
			position: relative;
			margin: 0;
			// display: block;
			margin: 1px 0 0;
			// padding: 3px 4px;
			font: 1.1rem/1rem $table-font;
			height: auto;
			// width: calc(100% + 8px);
			&:focus {
				z-index: 2;
			}
		}
	}
	.delete-actions {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 5rem 8rem;
		background-color: rgba(255, 255, 255, 0.9);
		text-align: center;
		.warning {
			margin: 1rem 0;
		}
		.buttons {
			display: flex;
		}
		.button {
			flex: 1 0 auto;
			margin: 3rem;
		}
	}
</style>
