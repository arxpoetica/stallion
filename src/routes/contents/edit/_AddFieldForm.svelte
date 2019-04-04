<div class="dtf" style="margin-bottom:2rem;">
	{JSON.stringify(recipe)}
</div>

<div class="box">
	<Form message={''}>
		<h3>Add New Field</h3>
		<LabelSelect bind:value={type} {options} label="Field type" focus={true}/>
		<!-- <LabelInput bind:value={name} required={true} label="Name" help="Content type names should be plural." {valid} {message} focus={true}/> -->
		<!-- nameInput -->
		<!-- <button slot="post" type="submit" class="btn">Log In</button> -->

		{#if type === 'String'}
			<String bind:recipe/>
		{:else if type === 'Text'}
			<Text bind:recipe/>
		{:else if type === 'Number'}
			<Number bind:recipe/>
		{:else if type === 'Boolean'}
			<Boolean bind:recipe/>
		{:else if type === 'Date'}
			<Date bind:recipe/>
		{:else if type === 'Email'}
			<Email bind:recipe/>
		{:else if type === 'Media'}
			<Media bind:recipe/>
		{:else if type === 'Relation'}
			<Relation bind:recipe/>
		{/if}
	</Form>
</div>

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
	let type
	let recipe = { type }

	let priorType = type
	$: if (type !== priorType) {
		priorType = type
		recipe = { type }
	}

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
	h3 {
		margin: 0 0 2rem;
	}
</style>