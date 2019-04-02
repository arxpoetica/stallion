<div class="mini-form">
	<h1>{title}</h1>
	{#if subtitle}
		<p>{subtitle}</p>
	{/if}
	<slot name="head"></slot>
	{#if message}
		<div class="error">{message}</div>
	{/if}
	<form on:submit={internalSubmit}>
		<slot name="pre"></slot>
		<div class="fieldset">
			<slot></slot>
		</div>
		<slot name="post"></slot>
	</form>
</div>

<script>
	import { getContext } from 'svelte'

	export let title = 'Please fill out details'
	export let subtitle
	export let message

	const { submit } = getContext('mini-form.submit')
	async function internalSubmit(event) {
		event.preventDefault()
		submit(event)
	}
</script>

<style type="text/scss">
	.mini-form {
		max-width: 400px;
		margin: 0 auto;
	}
	.error {
		margin: 0 0 1rem;
		padding: 1rem;
		background-color: $red-l5;
		border: 1px solid $red-main;
		color: $red-dark;
		font-weight: $bold;
	}
	.fieldset {
		margin: 0 0 12px;
		padding: 12px;
		border: 1px solid $gray-5;
		border-radius: 2px;
		// :last-child {
		// 	input[type="password"] {
		// 		margin-bottom: 0;
		// 	}
		// }
	}
</style>
