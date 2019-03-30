<h1>Create a New Collection</h1>

<Form {message}>
	<label>
		Name
		<input type="text">
	</label>
	<label>
		Description
		<input type="text">
	</label>
	<!-- <label>Username
		<input bind:this={username} type="text" name="username" required="required">
	</label> -->
	<!-- <label>Password
		<input bind:this={password} type="password" name="password" required="required">
	</label> -->
	<!-- <button slot="post" type="submit" class="btn">Log In</button> -->
</Form>

<script>
	import { getSession } from '@sapper/app'
	const session = getSession()

	import Form from '../../components/forms/Form.svelte'

	let message
	let name
	let description

	import { setContext } from 'svelte'
	setContext('form.submit', {
		submit: async (event) => {
			event.preventDefault()
			console.log('submitting!')
		}
	})
</script>