<LabelCheckbox bind:checked={wysiwyg} label="Display as a WYSIWYG" help="Otherwise, the value will be editable through a basic textarea field"/>
<LabelInput bind:value={name} label="Name"/>

<LabelTextarea bind:value={initial} label="Default value"/>

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
	import LabelTextarea from '../../../../components/forms/LabelTextarea.svelte'
	import LabelCheckbox from '../../../../components/forms/LabelCheckbox.svelte'

	export let recipe = {}

	let wysiwyg = true
	let name
	let initial
	let min
	let max
	let required
	let unique

	$: {
		recipe.wysiwyg = wysiwyg
		recipe.value = name
		recipe.initial = initial
		recipe.min = min
		recipe.max = max
		recipe.required = required
		recipe.unique = unique
	}
</script>
