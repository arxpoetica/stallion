<MiniForm title="Setup" subtitle="Let's set up your Stallion headless CMS.">
	<h2>Pick a username, email, and password</h2>
	<label data-valid={usernameValid}>
		<span class="ghost">Pick a username</span>
		<input bind:this={usernameInput} bind:value={username} type="text" name="username" placeholder="Pick a username" required="required">
		{#if usernameValid === false}
			<div class="popup"><Popup valid={false} message={usernameMessage}/></div>
		{/if}
	</label>
	<label data-valid={emailValid}>
		<span class="ghost">Email address</span>
		<input bind:value={email} type="email" name="email" placeholder="Email Address" required="required">
		{#if emailValid === false}
			<div class="popup"><Popup valid={false} message={emailMessage}/></div>
		{/if}
	</label>
	<label data-valid={passwordValid}>
		<span class="ghost">Create a password</span>
		<input bind:value={password} type="password" name="password" placeholder="Create a password" required="required">
		{#if passwordValid === false}
			<div class="popup"><Popup valid={false} message={passwordMessage}/></div>
		{/if}
	</label>
	<button slot="post" class="button {submittable ? '' : 'disabled'}" type="submit">Sign Up</button>
</MiniForm>

{#if reload}
	<ReloadBlock/>
{/if}

<script>
	import debounce from 'just-debounce-it'
	const validate = debounce(cb => cb(), 500)

	import { onMount, setContext } from 'svelte'
	import { GET, POST } from '../../_server/utils/loaders.js'
	import { usernameRegex } from '../../_server/db/validators/generic.js'
	import MiniForm from '../../components/forms/MiniForm.svelte'
	import Popup from '../../components/forms/Popup.svelte'
	import ReloadBlock from '../../components/shared/ReloadBlock.svelte'

	// ------------------- >>>>> username
	let username = ''
	let priorUsername = ''
	let usernameValid = 'inert'
	let usernameMessage = ''
	$: if (username !== priorUsername) {
		priorUsername = username
		let message = ''
		const length = username.length
		if (length < 1) {
			usernameValid = 'inert'
			usernameMessage = message
		} else if (length < 3) {
			usernameValid = false
			usernameMessage = 'Username is too short (minimum 3 characters).'
		} else if (length > 39) {
			usernameValid = false
			usernameMessage = 'Username is too long (maximum is 39 characters).'
		} else if (!usernameRegex.test(username)) {
			usernameValid = false
			usernameMessage = 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.'
		} else {
			usernameValid = 'inert'
			usernameMessage = ''
			validate(async() => {
				const res = await POST('/api/signup-validate.json', {
					type: 'username',
					filters: { _key: username },
				})
				usernameValid = res.valid
				usernameMessage = res.message
			})
		}
	}

	// ------------------- >>>>> email
	let email = ''
	let priorEmail = email
	let emailValid = 'inert'
	let emailMessage = ''
	$: if (email !== priorEmail) {
		priorEmail = email
		emailValid = 'inert'
		emailMessage = ''
		validate(async() => {
			const res = await POST('/api/signup-validate.json', {
				type: 'email',
				filters: { email },
			})
			emailValid = email.length < 1 ? 'inert' : email.length >= 6 && res.valid
			emailMessage = res.message ? res.message : (emailValid || emailValid === 'inert' ? '' : 'Email is invalid.')
		})
	}

	// ------------------- >>>>> password
	let password = ''
	$: passwordValid = password.length < 1 ? 'inert' : password.length >= 8
	$: passwordMessage = passwordValid ? '' : 'Password must be 8 or more characters.'

	let submittable
	$: submittable = usernameValid === true && emailValid === true && passwordValid === true

	// for some reason, it's not ready until clearing the stack
	let usernameInput
	onMount(() => setTimeout(() => usernameInput.focus(), 0))

	let reload = false
	setContext('mini-form.submit', {
		submit: async (event) => {
			event.preventDefault()
			if (submittable) {
				const res = await POST('/api/signup.json', { username, email, password })
				if (res.error) {
					console.group('error!')
					console.log(res.error)
					console.groupEnd()
					// FIXME: handle the error!!!!
					// FIXME: handle the error!!!!
					// FIXME: handle the error!!!!
				} else {
					// const res = await GET('/api/restart.json')
					// window.location.reload(true)
					reload = true
				}
			}
		}
	})
</script>

<style type="text/scss">
	.divider {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 33px;
		margin: 0 0 6px;
		background-image: linear-gradient(transparent 0px, transparent 15px, $gray-5 16px, transparent 17px);
		background-size: 34px 34px;
	}
	// h3 {
	// 	margin: 0;
	// 	text-align: center;
	// }

	// .border {
	// 	margin: 0 0 12px;
	// 	padding: 12px;
	// 	border: 1px solid $gray-5;
	// 	border-radius: 2px;
	// 	:last-child {
	// 		input[type="password"] {
	// 			margin-bottom: 0;
	// 		}
	// 	}
	// }
	h2 {
		margin: 0 0 1.2rem;
		font: $bold 1.6rem/1.2 $font;
	}
	label {
		position: relative;
		position: relative;
		&[data-valid="true"]::after,
		&[data-valid="false"]::after {
			content: '';
			position: absolute;
			top: 14px;
			right: 14px;
			width: 22px;
			height: 22px;
			background: url(/svg/valid-good.svg) no-repeat center transparent;
			background-size: cover;
		}
		&[data-valid="false"] {
			input[type="text"],
			input[type="email"],
			input[type="password"] {
				border: 1px solid $red-dark;
				box-shadow: 0 0 0 3px $red-light;
			}
			&::after {
				background-image: url(/svg/valid-bad.svg);
			}
		}
	}
	.popup {
		position: absolute;
		width: 100%;
		margin: -2.5rem 0 0 1.2rem;
	}
	input[type="text"],
	input[type="email"],
	input[type="password"] {
		padding: 0 4.5rem 0 1.2rem;
		height: 5rem;
		font: 1.6rem/1 $font;
	}
	.button {
		width: 100%;
		margin: 0 0 6px;
		padding: 1.2rem;
		font: $bold 1.6rem/1 $font;
	}
</style>
