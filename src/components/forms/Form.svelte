<div class="form">
	<h1>{title}</h1>
	{#if subtitle}
		<p>{subtitle}</p>
	{/if}
	<slot name="head"></slot>
	<form on:submit={internalSignup}>
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

	const { signup } = getContext('form.signup')
	async function internalSignup(event) {
		event.preventDefault()
		signup(event)
	}
</script>

<style type="text/scss">
	.form {
		max-width: 400px;
		margin: 0 auto;
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
