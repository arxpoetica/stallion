<LabelInput bind:value={name} label="Name"/>
<LabelSelect bind:value={format} {options} label="Number format"/>
<LabelInput bind:value={initial} label="Default value"/>
<div class="flex">
	<div class="flex-split">
		<LabelInput bind:value={min} label="Minimum length"/>
	</div>
	<div class="flex-split">
		<LabelInput bind:value={max} label="Maximum length"/>
	</div>
</div>
<LabelCheckbox bind:checked={required} label="Required field" help="You won't be able to create an entry if this field is empty"/>
<LabelCheckbox bind:checked={unique} label="Unique field" help="You won't be able to create an entry if there is an existing entry with identical content"/>

<script>
	import LabelInput from '../../../../components/forms/LabelInput.svelte'
	import LabelSelect from '../../../../components/forms/LabelSelect.svelte'
	import LabelCheckbox from '../../../../components/forms/LabelCheckbox.svelte'

	export let recipe = {}
	let name
	let format
	let initial
	let min
	let max
	let required
	let unique
	$: recipe.value = name
	$: recipe.format = format
	$: recipe.initial = initial
	$: recipe.min = min
	$: recipe.max = max
	$: recipe.required = required
	$: recipe.unique = unique

	const options = [{
		value: 'integer',
		name: 'integer (example: 10)',
	}, {
		value: 'biginteger',
		name: 'big integer (example: 123456789)',
	}, {
		value: 'float',
		name: 'float (example: 3.33333333)',
	}, {
		value: 'decimal',
		name: 'decimal (example: 2.22)',
	}]
</script>
