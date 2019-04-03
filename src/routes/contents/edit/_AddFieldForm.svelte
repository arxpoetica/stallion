<Form message={''}>
	<LabelSelect bind:value={name} {options} label="Add New Field" focus={true}/>
	<!-- <LabelInput bind:value={name} required={true} label="Name" help="Content type names should be plural." {valid} {message} focus={true}/> -->
	<!-- nameInput -->
	<!-- <button slot="post" type="submit" class="btn">Log In</button> -->

	{#if name === 'String'}
		<String/>
	{:else if name === 'Text'}
		<Text/>
	{:else if name === 'Number'}
		<Number/>
	{:else if name === 'Boolean'}
		<Boolean/>
	{:else if name === 'Date'}
		<Date/>
	{:else if name === 'Email'}
		<Email/>
	{:else if name === 'Media'}
		<Media/>
	{:else if name === 'Relation'}
		<Relation/>
	{/if}

</Form>


<script>
	import { setContext } from 'svelte'
	import { options } from './_options'
	// import { options } from './_options'
	// import AddFieldForm from './_AddFieldForm.svelte'
	import Form from '../../../components/forms/Form.svelte'
	import LabelSelect from '../../../components/forms/LabelSelect.svelte'

	import String from './_fields/String.svelte'
	import Text from './_fields/Text.svelte'
	import Number from './_fields/Number.svelte'
	import Boolean from './_fields/Boolean.svelte'
	import Date from './_fields/Date.svelte'
	// import JSON from './_fields/JSON.svelte'
	import Email from './_fields/Email.svelte'
	// import Password from './_fields/Password.svelte'
	import Media from './_fields/Media.svelte'
	import Relation from './_fields/Relation.svelte'
	// import Enumeration from './_fields/Enumeration.svelte'

	export let content
	let name

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
