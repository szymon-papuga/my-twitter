<script>
	import TweetWithFooter from './TweetWithFooter.svelte';

	export let tweets;

	const middleTweets = tweets.slice(1, -1);
</script>

<div class="flex flex-col divide-y">
	{#if tweets.length === 1}
		<TweetWithFooter tweet={tweets[0]} on:comment on:tweetClicked />
	{:else if tweets.length >= 2}
		<TweetWithFooter tweet={tweets[0]} on:comment on:tweetClicked>
			<div id="branch" slot="branch" class="h-full mt-3" />
		</TweetWithFooter>

		{#each middleTweets as tweet (tweet.id)}
			<TweetWithFooter {tweet} on:comment on:tweetClicked avatarTop={'top-1.5'}>
				<div id="upperBranch" slot="upperBranch" class="h-3.5" />
				<div id="branch" slot="branch" class="h-full" />
			</TweetWithFooter>
		{/each}

		<TweetWithFooter
			tweet={tweets[tweets.length - 1]}
			on:comment
			on:tweetClicked
			avatarTop={'top-0'}
		>
			<div id="upperBranch" slot="upperBranch" class="h-3.5" />
		</TweetWithFooter>
	{/if}
</div>

<style>
	#branch {
		width: 2px;
		background-color: rgb(207, 217, 222);
		margin-left: auto;
		margin-right: auto;
	}
	#upperBranch {
		width: 2px;
		background-color: rgb(207, 217, 222);
		margin-left: auto;
		margin-right: auto;
	}
</style>
