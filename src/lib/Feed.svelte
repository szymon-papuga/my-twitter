<script>
	import Tweet from './Tweet.svelte';
	import InfiniteScroll from 'svelte-infinite-scroll';

	export let tweets;
	let newTweetsLen = tweets.length;
	$: cursor = tweets[tweets.length - 1].id;

	async function fetchTweets() {
		const response = await fetch(`http://localhost:5173/tweets?cursor=${cursor}`);
		const newTweets = await response.json();
		tweets = [...tweets, ...newTweets];
		newTweetsLen = newTweets.length;
	}
</script>

<div class="w-2/5">
	{#each tweets as tweet (tweet.id)}
		<Tweet {tweet} />
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
