<script>
	import Tweet from './Tweet.svelte';
	import TweetFooter from './TweetFooter.svelte';

	let { tweet, avatarTop = 'top-4', comment, tweetClicked, upperBranch, branch } = $props();

	const upperBranch_render = upperBranch;
	const branch_render = branch;
</script>

<Tweet {tweet} {tweetClicked} {avatarTop}>
	{#snippet upperBranch()}
		{@render upperBranch_render?.()}
	{/snippet}
	{#snippet branch()}
		{@render branch_render?.()}
	{/snippet}
	{#snippet footer()}
		<TweetFooter {tweet} {comment} />
	{/snippet}
</Tweet>
