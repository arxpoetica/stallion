<form on:submit={submit}>
	<h1>Log In</h1>
	{#if message}
		<!-- FIXME: turn this into a component -->
		<div class="error">{message}</div>
	{/if}
	<div class="border">
		<label>Username
			<!-- autofocus="autofocus" -->
			<input bind:this={username} type="text" name="username" required="required">
		</label>
		<label>Password
			<input bind:this={password} type="password" name="password" required="required">
		</label>
	</div>
	<button type="submit" class="button">Log In</button>
</form>

<script context="module">
	export function preload(page, session) {
		if (session.user) { return this.redirect(302, '/') }
		return {}
	}
</script>

<script>
	import { getSession } from '@sapper/app'
	const session = getSession()

	let message
	let username
	let password

	export async function submit(event) {
		event.preventDefault()

		const formData = {
			// username: encodeURIComponent(this.refs.username.value),
			// password: encodeURIComponent(this.refs.password.value),
			username: username.value,
			password: password.value,
		}

		const response = await fetch('/auth/local/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'same-origin',
			body: JSON.stringify(formData)
		})
		const user = await response.json()

		if (user.message) {
			message = user.message
		} else {
			// NOTE: PREVENTS AUTH CHANGE FLICKER
			document.querySelector('html').classList.add('whiteout')
			session.set(Object.assign({}, $session, { user }))
			// FIXME: let's get rid of reload if possible
			window.location.reload(true)
		}
	}
</script>

<style type="text/scss">
	form {
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
	.border {
		margin: 0 0 12px;
		padding: 12px;
		border: 1px solid $teal-main;
		border-radius: 2px;
		:last-child {
			input[type="password"] {
				margin-bottom: 0;
			}
		}
	}
	// h2 {
	// 	margin: 0 0 1.2rem;
	// 	font: $bold 1.6rem/1.2 $font;
	// }
	input[type="text"],
	input[type="password"] {
		padding: 0 1.2rem;
		height: 5rem;
		font: 1.6rem/1 $font;
	}
	.button {
		width: 100%;
		padding: 1.2rem;
		font: $bold 1.6rem/1 $font;
	}
</style>
