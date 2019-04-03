{#if content}
	<div class="head">
		<div class="bar">
			<h1>{$page.params.name}</h1>
			<div class="buttons">
				<!-- FIXME: make these work -->
				<a class="btn small success" href={`/contents/edit/${$page.params.name}`}>Save</a>
				<a class="btn small alert" href={`/contents/edit/${$page.params.name}`}>Cancel</a>
			</div>
		</div>
		{#if content.description}
			<p class="description">{content.description}</p>
		{/if}
	</div>

	<center>
		<h2>There are no fields yet</h2>
		<p>Add your first field to your new Content Type</p>
		<button class="btn small">Add New Field</button>
	</center>

	<Form message={''}>
		<!-- <LabelSelect {options}/> -->
		<!-- <LabelInput bind:value={name} required={true} label="Name" help="Content type names should be plural." {valid} {message} focus={true}/> -->
		<!-- nameInput -->
		<!-- <label>
			Description
			<textarea bind:value={description}></textarea>
		</label> -->
		<!-- <button slot="post" type="submit" class="btn">Log In</button> -->
	</Form>

	<p>{$page.params.name}</p>
{:else}
	<p>. . . loading . . .</p>
{/if}



<script context="module">
	import { POST } from '../../../_server/utils/loaders'

	export async function preload({ params }) {
		const content = await POST(`/api/contents/${params.name}.json`, { name: params.name })
		return { content }
	}
</script>

<script>
	import { beforeUpdate, setContext } from 'svelte'

	import { page/* , getSession */ } from '@sapper/app'
	// const session = getSession()

	import { options } from './_options'
	import Form from '../../../components/forms/Form.svelte'
	import LabelSelect from '../../../components/forms/LabelSelect.svelte'

	export let content
	let description

	setContext('form.submit', {
		submit: async (event) => {
			event.preventDefault()
			console.log('hallo world')
			// const content = await POST('/api/contents/create.json', { name, description })
			// contents.update(arr => {
			// 	// TODO: SORT IT!
			// 	arr.push(content)
			// 	arr.sort((a, b) => a.name.localeCompare(b.name))
			// 	return arr
			// })
		}
	})
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
</style>
