<svelte:head><title>Stallion - Browse Profiles</title></svelte:head>

<h1>Browse Profiles</h1>
{#if users}
	<div class="profiles-section">
		<div class="profiles">
			{#each users as user}
				<div class="profile">
					<div class="avatar">
						{#if user.avatar}
							<div style="background-image:url({user.avatar});"></div>
						{/if}
					</div>
					<div class="detail">

						<h2 class="name"><a href="/st/{user.username}">{user.displayName}</a></h2>
						<h3 class="username">{user.username}</h3>
						{#if user.bio}
							<p class="bio">{user.bio}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<h2>LOADING</h2>
{/if}

<script context="module">
	import { graphQuery } from '../_server/utils/loaders.js'
	export async function preload() {
		const { users } = await graphQuery('{ users { username email bio avatar last first displayName } }')
		return { users }
	}
</script>

<script>
	export let users
</script>

<style type="text/scss">
	.profile {
		display: flex;
		align-items: center;
		margin: 0 0 2rem;
		padding: 1.2rem 2rem;
		background-color: $gray-7;
		box-shadow: 0 0 2px $gray-5;
	}
	.avatar {
		// overflow: hidden;
		flex: 0 0 100px;
		height: 100px;
		background: none no-repeat center $gray-6;
		background-size: cover;
		border-radius: 100%;
		> div {
			// these three lines prevent bleeding
			height: calc(100% + 2px);
			width: calc(100% + 2px);
			margin: -1px 0 0 -1px;
			background: none no-repeat center transparent;
			background-size: cover;
			border-radius: 100%;
		}
	}
	.detail {
		// flex: 1 0 auto;
		margin: 0 0 0 2rem;
	}
</style>
