<h1>Create a New Collection</h1>

<Form {message}>
	<label>
		Name
		<input bind:this={nameInput} bind:value={name} type="text" required="required">
		<div class="help">Collection names should be plural.</div>
	</label>
	<label>
		Description
		<textarea bind:value={description}></textarea>
	</label>
	<!-- <button slot="post" type="submit" class="btn">Log In</button> -->
</Form>

<script>
	import { onMount, setContext } from 'svelte'
	import { getSession } from '@sapper/app'
	const session = getSession()

	import Form from '../../components/forms/Form.svelte'

	let message
	let name = ''
	let description = ''

	// for some reason, it's not ready until clearing the stack
	let nameInput
	onMount(() => setTimeout(() => nameInput.focus(), 0))

	import { POST } from '../../_server/utils/loaders.js'
	import { collections } from '../../stores/app-store.js'
	setContext('form.submit', {
		submit: async (event) => {
			event.preventDefault()
			const collection = await POST('/api/collections/create.json', { name, description })
			collections.update(arr => {
				// TODO: SORT IT!
				arr.push(collection)
				return arr
			})
		}
	})
</script>

<style type="text/scss">
	label {
		margin: 0 0 2rem;
		font: 1.6rem/1 $font;
	}
	input {
		margin: 0.5rem 0;
	}
	textarea {
		height: 12rem;
		margin: 0.5rem 0;
	}
	.help {
		font: 1.2rem/1 $font;
		color: $gray-3;
	}
</style>
