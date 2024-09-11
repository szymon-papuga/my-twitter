<script>
	import Tweet from './Tweet.svelte';
	import TweetFooter from './TweetFooter.svelte';

	export let tweet;
	export let avatarTop = 'top-4';
</script>

<Tweet {tweet} on:tweetClicked {avatarTop}>
	<slot name="upperBranch" slot="upperBranch" />
	<slot name="branch" slot="branch" />
	<TweetFooter {tweet} on:comment slot="footer" />
</Tweet>
