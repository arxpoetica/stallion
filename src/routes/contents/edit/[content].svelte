<div class="head">
	<h1>Content Type</h1>
	<div class="buttons">
		<!-- FIXME: make these work -->
		<a class="btn small success" href={`/contents/edit/${$page.params.content}`}>Save</a>
		<a class="btn small alert" href={`/contents/edit/${$page.params.content}`}>Cancel</a>
	</div>
</div>

<p>{$page.params.content}</p>

<script>
	import { page } from '@sapper/app'
</script>

<style type="text/scss">
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 0 2rem;
		h1,
		.btn {
			margin-bottom: 0;
		}
	}
</style>
