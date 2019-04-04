<label>
	<span class="wrap">
		<input bind:this={input} bind:checked type="checkbox" {required}>
		{label}
	</span>
	{#if help}
		<span class="help">{help}</span>
	{/if}
</label>

<script>
	import { onMount } from 'svelte'

	export let label = 'Toggle'
	export let checked = false
	export let required = false
	export let help = false
	export let focus = false

	let input

	onMount(() => {
		if (focus) {
			// for some reason, it's not ready until clearing the stack
			setTimeout(() => input.focus(), 0)
		}
	})
</script>

<style type="text/scss">
	label {
		margin: 0 0 2rem;
		font: 1.6rem/1 $font;
	}
	.wrap {
		display: flex;
		align-items: center;
		margin: 0 0 0.5rem;
	}
	input {
		margin: 0 0.8rem 0 0;
		padding: 0.5rem 3rem 0.5rem 0.5rem;
	}
	.help {
		display: block;
		font: 1.2rem/1 $font;
		color: $gray-3;
	}
</style>
