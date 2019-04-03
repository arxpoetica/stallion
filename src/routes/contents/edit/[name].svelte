<div class="head">
	<div class="bar">
		<h1>{content.name}</h1>
		<div class="buttons">
			<!-- FIXME: make these work -->
			<a class="btn small success" href={`/contents/edit/${content.name}`}>Save</a>
			<a class="btn small alert" href={`/contents/edit/${content.name}`}>Cancel</a>
		</div>
	</div>
	{#if content.description}
		<p class="description">{content.description}</p>
	{/if}
</div>

<div class="fields">
	{#if content.fields && content.fields.length}
		<ul>
			{#each content.fields as field}
				<li>{field}</li>
			{/each}
		</ul>
	{:else}
		<h3>There are no fields yet</h3>
		<p>Add your first field to content type "{content.name}".</p>
	{/if}
	{#if !adding}
		<div class="buttons">
			<button class="btn small" on:click={() => adding = true}>Add New Field</button>
		</div>
	{/if}
</div>

{#if adding}
	<AddFieldForm {content}/>
{/if}

<script context="module">
	import { POST } from '../../../_server/utils/loaders'
	export async function preload({ params }) {
		const content = await POST(`/api/contents/${params.name}.json`, { name: params.name })
		return { content }
	}
</script>

<script>
	import AddFieldForm from './_AddFieldForm.svelte'
	export let content
	let adding = false
</script>

<style type="text/scss">
	.head {
		margin: 0 0 2rem;
	}
	.bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		h1,
		.btn {
			margin-bottom: 0;
		}
	}
	.fields {
		margin: 0 0 2rem;
		padding: 1rem;
		border: 1px solid $gray-6;
		background-color: $gray-light;
		:last-child {
			margin-bottom: 0;
		}
	}
</style>
