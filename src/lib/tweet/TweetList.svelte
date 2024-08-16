<script>
	import InfiniteScroll from 'svelte-infinite-scroll';
	import TweetWithFooter from '$lib/tweet/TweetWithFooter.svelte';

	export let tweets;
	let newTweetsLen = tweets.length;
	$: cursor = newTweetsLen > 0 ? tweets[tweets.length - 1].id : null;

	async function fetchTweets() {
		const response = await fetch(`http://localhost:5173/tweets?cursor=${cursor}`);
		const newTweets = await response.json();
		tweets = [...tweets, ...newTweets];
		newTweetsLen = newTweets.length;
	}
</script>

<div class="divide-y">
	{#each tweets as tweet (tweet.id)}
		<TweetWithFooter {tweet} on:comment on:tweetClicked />
	{/each}
	<InfiniteScroll
		hasMore={newTweetsLen}
		threshold={100}
		window={true}
		on:loadMore={() => {
			fetchTweets();
		}}
	/>
</div>
