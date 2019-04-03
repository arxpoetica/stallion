<h2>Add New Field</h2>
<select>
	{#each options as option}
		<option value={option.type}>{option.type}</option>
	{/each}
</select>

<script>
	import options from './_options.js'
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