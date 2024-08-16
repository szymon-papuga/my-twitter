<script>
	import Tweet from './Tweet.svelte';
	import TweetFooter from './TweetFooter.svelte';

	export let tweet;
</script>

<Tweet {tweet} on:tweetClicked>
	<slot slot="branch" />
	<TweetFooter {tweet} on:comment slot="footer" />
</Tweet>
