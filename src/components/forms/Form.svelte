<div class="form">
	{#if message}
		<div class="error">{message}</div>
	{/if}
	<form on:submit={internalSubmit}>
		<div class="fieldset">
			<slot></slot>
		</div>
		<slot name="actions">
			<button class="btn" type="submit">Save</button>
			<button class="btn" type="submit">Cancel</button>
		</slot>
	</form>
</div>

<script>
	export let message

	import { getContext } from 'svelte'
	const { submit } = getContext('form.submit')
	async function internalSubmit(event) {
		event.preventDefault()
		submit(event)
	}
</script>

<style type="text/scss">
	// .form {}
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
	}
</style>
