<svelte:head>
	<title>{user && user.username ? user.username : 'Loading...'} Profile</title>
</svelte:head>

<div class="profile">
	{#if user}
		<div class="head">
			<div class="avatar" style="background-image:url({user.avatar});"></div>
			<h1>{user.displayName}</h1>
			<h2>{user.username}</h2>
			{#if user.bio}
				<div>{user.bio}</div>
				<!-- <div>{user.bio} | {user.email}</div> -->
			{/if}
		</div>
		{#if user.posts && user.posts.length}
			<div class="posts-wrap">
				<h3>Select a project:</h3>
				<div class="posts">
					{#each user.posts as post}
						<a href="/st/{user.username}/{post.id}" class="post color-{Math.round(Math.random() * 4) + 1}">{post.name}</a>
					{/each}
				</div>
			</div>
		{/if}
	{:else}
		<h2>LOADING</h2>
	{/if}
</div>

<script context="module">
	import { graphQuery } from '../../_services/loaders.js'
	export async function preload({ params }) {
		const { user } = await graphQuery(`{
			user(username: "${params.profile}")  {
				username
				email
				bio
				avatar
				last
				first
				displayName
				posts { id, name }
			}
		}`)
		return { user }
	}
</script>

<script>
	export let user
</script>

<style type="text/scss">
	.profile {
		max-width: 40rem;
		margin: 0 auto 2rem;
	}
	.head {
		text-align: center;
		margin: 0 0 2rem;
		padding: 5rem;
	}
	.avatar {
		width: 200px;
		height: 200px;
		margin: 0 auto 0.8rem;
		background: none no-repeat center $black;
		background-size: cover;
		border-radius: 100%;
		box-shadow: 0 0 3px rgba($black, 0.8);
	}
	.posts-wrap {
		display: flex;
		h3 {
			margin: 0.8rem 2rem 0 0;
		}
	}
	.posts {
		flex: 1;
	}
	.post {
		display: block;
		margin: 0 0 1.2rem;
		padding: 1rem 1.6rem;
		// border-radius: 8px;
		color: $white;
		text-decoration: none;
		// &:nth-child(4n + 1) { background-color: $red-main; }
		// &:nth-child(4n + 2) { background-color: $yellow-main; color: $black; }
		// &:nth-child(4n + 3) { background-color: $teal-main; }
		// &:nth-child(4n + 4) { background-color: $orange-main; }
		// &:nth-child(4n + 5) { background-color: $green-main; }
		&.color-1 { background-color: $red-main; }
		&.color-2 { background-color: $yellow-main; color: $black; }
		&.color-3 { background-color: $teal-main; }
		&.color-4 { background-color: $orange-main; }
		&.color-5 { background-color: $green-main; }
	}
</style>
