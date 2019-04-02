<label>
	<span class="text" class:ghost>{label}</span>
	<span class="wrap" data-valid={valid}>
		{#if placeholder}
			<input bind:this={input} bind:value type="text" {placeholder} {required}>
		{:else}
			<input bind:this={input} bind:value type="text" {required}>
		{/if}
		{#if help}
			<div class="help">{help}</div>
		{/if}
		{#if !valid}
			<span class="popup"><Popup valid={false} {message}/></span>
		{/if}
	</span>
</label>

<script>
	import { onMount } from 'svelte'
	import Popup from './Popup.svelte'

	export let type = 'text'
	export let ghost = false
	export let label = type
	export let value = 'asfasdfhjk'
	export let placeholder = ''
	export let required = false
	export let help = false
	export let valid = 'inert'
	export let message = ''
	export let focus = false

	let input

	onMount(() => {
		if (type !== 'text') {
			input.type = type
		}
		if (focus) {
			// for some reason, it's not ready until clearing the stack
			setTimeout(() => input.focus(), 0)
		}
	})
</script>

<style type="text/scss">
	label {
		margin: 0 0 2rem;
	}
	.text {
		display: block;
		margin: 0 0 0.5rem;
		font: 1.6rem/1 $font;
	}
	.wrap {
		display: block;
		position: relative;
		&[data-valid="true"]::after,
		&[data-valid="false"]::after {
			content: '';
			position: absolute;
			top: 0.7rem;
			right: 0.7rem;
			width: 1.6rem;
			height: 1.6rem;
			background: url(/svg/valid-good.svg) no-repeat center transparent;
			background-size: cover;
		}
		&[data-valid="false"] {
			input {
				border: 1px solid $red-dark;
				box-shadow: 0 0 0 3px $red-light;
			}
			&::after {
				background-image: url(/svg/valid-bad.svg);
			}
		}
	}
	input {
		margin: 0 0 0.5rem;
		padding: 0.5rem 3rem 0.5rem 0.5rem;
	}
	.help {
		font: 1.2rem/1 $font;
		color: $gray-3;
	}
	.popup {
		display: block;
		position: absolute;
		width: 100%;
		margin: -2rem 0 0 0.5rem;
	}
</style>
