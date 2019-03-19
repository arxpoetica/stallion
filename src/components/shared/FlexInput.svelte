<div class="input" style="width:{width || Math.max(minWidth, clientWidth)}px;">
	<div class="measure" bind:clientWidth>{value}</div>
	{#if type === 'number'}
		<input type="number" style="text-align:{align};" {step} {min} {max} bind:value on:change={() => dispatch('inputchange', { value })}/>
	{:else}
		<input type="text" style="text-align:{align};" bind:value on:change={() => dispatch('inputchange', { value })}/>
	{/if}
</div>

<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let type = 'number'
	export let value = ''
	export let width = ''
	export let step = 'any'
	export let min = ''
	export let max = ''
	export let align = 'center'
	let clientWidth = 30
	let minWidth = 30
</script>

<style type="text/scss">
	.input {
		position: relative;
		font: inherit;
		background-color: $gray-1;
		border-radius: 2px;
	}
	.measure {
		position: absolute;
		padding: 0 0.6rem;
		opacity: 0;
		pointer-events: none;
	}
	[type="text"],
	[type="number"] {
		width: 100%;
		height: auto;
		margin: 0;
		padding: 0;
		border: 0;
		background-color: transparent;
		box-shadow: none;
		color: inherit;
		font: inherit;
	}
</style>
