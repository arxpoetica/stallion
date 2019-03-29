<div class="popup {direction}" data-valid={valid}>{@html message}</div>

<script>
	export let direction = 'sw'
	export let valid = true
	export let message = ''
</script>

<style type="text/scss">
	.popup {
		position: absolute;
		top: calc(100% + 12px);
		max-width: 90%;
		padding: 0.6rem 1rem;
		background-color: white;
		border: 1px solid $gray-2;
		border-radius: 4px;
		font: 1.3rem/1.4 $font;
		z-index: $z-middle;
		&::after,
		&::before {
			content: '';
			bottom: 100%;
			left: 1.2rem;
			position: absolute;
			height: 0;
			width: 0;
			border: solid transparent;
			pointer-events: none;
		}
		&::before {
			border: 9px solid transparent;
			border-bottom-color: $gray-2;
			margin-left: -1px;
		}
		&::after {
			border: 8px solid transparent;
			border-bottom-color: white;
		}
		&[data-valid="false"] {
			background-color: $red-light;
			border-color: $red-dark;
			color: $red-dark;
			&::before {
				border-bottom-color: $red-dark;
			}
			&::after {
				border-bottom-color: $red-light;
			}
		}
		&.nw {
			top: auto;
			bottom: calc(100% + 12px);
			&::after,
			&::before {
				top: 100%;
				bottom: auto;
			}
			&::before {
				border-color: transparent;
				border-top-color: $gray-2;
			}
			&::after {
				border-color: transparent;
				border-top-color: white;
			}
			&[data-valid="false"] {
				&::before { border-top-color: $red-dark; }
				&::after { border-top-color: $red-light; }
			}
		}
	}
</style>
