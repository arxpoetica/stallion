<div class="flow">
	<div class="col">
		<LabelSelect bind:value={from} {options} label="From field"/>
	</div>
	<div class="panel">
		<div class="radios">
			{#each radios as radio}
				<LabelRadio value={radio} bind:group label={radio.split('-').join(' ')}/>
			{/each}
		</div>
	</div>
	<div class="col">
		<LabelSelect bind:value={to} {options} label="To field"/>
	</div>
</div>

<script>
	import { onMount } from 'svelte'
	import { contents } from '../../../../stores/app-store'

	import LabelSelect from '../../../../components/forms/LabelSelect.svelte'
	import LabelRadio from '../../../../components/forms/LabelRadio.svelte'

	const radios = [
		'has-one',
		'has-and-belongs-to-one',
		'belongs-to-many',
		'has-many',
		'has-and-belongs-to-many',
	]
	$: options = $contents && $contents.length ? $contents.map(content => {
		return { value: content.name }
	}) : []

	export let recipe = {}
	let group = radios[0]
	$: from = options.length ? options[0].value : ''
	$: to = options.length > 1 ? options[1].value : options.length ? options[0].value : ''

	$: recipe.group = group
	$: recipe.from = from
	$: recipe.to = to
</script>

<style type="text/scss">
	.flow {
		display: flex;
		justify-content: space-between;
		background: none repeat-x 0 3.6rem transparent;
		background-image: linear-gradient(180deg, $gray-5 1px, transparent 1px);
		// @media (--small) { display: block; }
	}
	.col {
		flex: 1;
	}
	.panel {
		display: flex;
		justify-content: center;
		flex: 3;
	}
	.radios {
		padding: 1rem;
		background-color: $white;
		border: 1px solid $gray-5;
		border-radius: 2px;
	}
</style>
