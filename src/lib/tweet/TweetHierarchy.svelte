<script>
	import TweetWithFooter from './TweetWithFooter.svelte';

	let { tweets, comment, tweetClicked } = $props();

	const middleTweets = tweets.slice(1, -1);
</script>

<div class="flex flex-col divide-y">
	{#if tweets.length === 1}
		<TweetWithFooter tweet={tweets[0]} {comment} {tweetClicked} />
	{:else if tweets.length >= 2}
		<TweetWithFooter tweet={tweets[0]} {comment} {tweetClicked}>
			{#snippet branch()}
				<div class="branch h-full mt-3"></div>
			{/snippet}
		</TweetWithFooter>

		{#each middleTweets as tweet (tweet.id)}
			<TweetWithFooter {tweet} {comment} {tweetClicked} avatarTop={'top-1.5'}>
				{#snippet upperBranch()}
					<div class="branch h-3.5"></div>
				{/snippet}
				{#snippet branch()}
					<div class="branch h-full"></div>
				{/snippet}
			</TweetWithFooter>
		{/each}

		<TweetWithFooter tweet={tweets[tweets.length - 1]} {comment} {tweetClicked} avatarTop={'top-0'}>
			{#snippet upperBranch()}
				<div class="branch h-3.5"></div>
			{/snippet}
		</TweetWithFooter>
	{/if}
</div>

<style>
	.branch {
		width: 2px;
		background-color: rgb(207, 217, 222);
		margin-left: auto;
		margin-right: auto;
	}
</style>
