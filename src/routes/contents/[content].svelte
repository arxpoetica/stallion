<div class="head">
	<h1>Content Type</h1>
	<a class="btn small warning" href={`/contents/edit/${$page.params.content}`}>Edit</a>
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
