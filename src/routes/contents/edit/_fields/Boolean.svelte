<LabelInput bind:value={name} label="Name"/>

<LabelCheckbox bind:checked={initial} label="Default value as true" help="Checking the box sets the default to true, else default is false"/>
<LabelCheckbox bind:checked={required} label="Required field" help="You won't be able to create an entry if this field is empty"/>
<LabelCheckbox bind:checked={unique} label="Unique field" help="You won't be able to create an entry if there is an existing entry with identical content"/>

<script>
	import LabelInput from '../../../../components/forms/LabelInput.svelte'
	import LabelCheckbox from '../../../../components/forms/LabelCheckbox.svelte'

	let name
	let initial
	let required
	let unique

	export let recipe = {}
	$: {
		recipe.value = name
		recipe.initial = initial
		recipe.required = required
		recipe.unique = unique
	}
</script>
