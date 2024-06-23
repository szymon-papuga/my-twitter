<script>
	import CommentPopup from '../lib/CommentPopup.svelte';
	import Feed from '../lib/Feed.svelte';

	export let data;
	let tweet;
</script>

<div class="flex justify-center mt-6">
	<Feed tweets={data.tweets} on:comment={(event) => (tweet = event.detail)} />
	{#if tweet !== undefined}
		<CommentPopup {tweet} on:close={() => (tweet = undefined)} />
	{/if}
</div>
