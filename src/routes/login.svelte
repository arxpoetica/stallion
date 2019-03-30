<MiniForm title="Log In" {message}>
	<label>Username
		<!-- autofocus="autofocus" -->
		<input bind:this={username} type="text" name="username" required="required">
	</label>
	<label>Password
		<input bind:this={password} type="password" name="password" required="required">
	</label>
	<button slot="post" type="submit" class="button">Log In</button>
</MiniForm>

<script context="module">
	export function preload(page, session) {
		if (session.user) { return this.redirect(302, '/') }
		return {}
	}
</script>

<script>
	import { getSession } from '@sapper/app'
	const session = getSession()

	import { setContext } from 'svelte'
	import MiniForm from '../components/forms/MiniForm.svelte'

	let message
	let username
	let password

	let reload = false
	setContext('mini-form.submit', {
		submit: async (event) => {
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
	})
</script>

<style type="text/scss">
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
