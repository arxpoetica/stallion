<h1>Create a New Content Type</h1>

<Form message={formMessage}>
	<LabelInput bind:value={name} required={true} label="Name" help="Content type names should be plural." {valid} {message} focus={true}/>
	<!-- nameInput -->
	<label>
		Description
		<textarea bind:value={description}></textarea>
	</label>
	<!-- <button slot="post" type="submit" class="btn">Log In</button> -->
</Form>

<script>
	import { beforeUpdate, setContext } from 'svelte'
	import { getSession } from '@sapper/app'
	const session = getSession()

	import Form from '../../components/forms/Form.svelte'
	import LabelInput from '../../components/forms/LabelInput.svelte'

	let formMessage
	let name = ''
	$: valid = name.length < 1 ? 'inert' : !name.match(/^-|[^a-z0-9-]|--|-$/g)
	$: message = valid ? '' : 'Content type names must be alphanumeric, lowercase, and must start and end with a letter or number. Use single hyphens to divide words.'
	let description = ''

	import { POST } from '../../_server/utils/loaders.js'
	import { contents } from '../../stores/app-store.js'
	setContext('form.submit', {
		submit: async (event) => {
			event.preventDefault()
			const content = await POST('/api/contents/create.json', { name, description })
			contents.update(arr => {
				// TODO: SORT IT!
				arr.push(content)
				arr.sort((a, b) => a.name.localeCompare(b.name))
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
	textarea {
		height: 12rem;
		margin: 0.5rem 0;
	}
</style>
