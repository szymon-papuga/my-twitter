<script>
	import CommentPopup from '$lib/tweet/CommentPopup.svelte';
	import TweetList from '$lib/tweet/TweetList.svelte';
	import CommentForm from '$lib/tweet/CommentForm.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import TweetHierarchy from '$lib/tweet/TweetHierarchy.svelte';

	export let data;
	let tweet;
	const tweetId = parseInt($page.params.tweetId);

	function handleComment(event) {
		tweet = event.detail;
	}

	function handleTweetClicked(event) {
		tweet = event.detail;
		if (browser) {
			// to prevent error window is not defined, because it's SSR
			window.location.href = `/tweets/${event.detail.id}`;
		}
	}
</script>

<div class="flex flex-col w-2/5 border divide-y">
	<!-- TODO: extract function? -->
	<TweetHierarchy
		tweets={data.tweets.filter((tweet) => tweet.parentTweetId !== tweetId)}
		on:comment={handleComment}
		on:tweetClicked={handleTweetClicked}
	/>
	<CommentForm {tweetId} rows={1} />
	<TweetList
		tweets={data.tweets.filter((tweet) => tweet.parentTweetId === tweetId)}
		on:comment={handleComment}
		on:tweetClicked={handleTweetClicked}
	/>
</div>
{#if tweet !== undefined}
	<CommentPopup {tweet} on:close={() => (tweet = undefined)} />
{/if}
