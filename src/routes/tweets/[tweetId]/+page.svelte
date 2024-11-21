<script>
	import CommentPopup from '$lib/tweet/CommentPopup.svelte';
	import TweetList from '$lib/tweet/TweetList.svelte';
	import CommentForm from '$lib/tweet/CommentForm.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import TweetHierarchy from '$lib/tweet/TweetHierarchy.svelte';

	let { data } = $props();
	let tweet = $state();
	const tweetId = parseInt($page.params.tweetId);

	function handleComment(tweetBeingCommented) {
		tweet = tweetBeingCommented;
	}

	function handleTweetClicked(clicked) {
		if (browser) {
			// to prevent error window is not defined, because it's SSR
			window.location.href = `/tweets/${clicked.id}`;
		}
	}
</script>

<div class="flex flex-col w-2/5 border divide-y">
	<!-- TODO: extract function? -->
	<TweetHierarchy
		tweets={data.tweets.filter((tweet) => tweet.parentTweetId !== tweetId)}
		comment={handleComment}
		tweetClicked={handleTweetClicked}
	/>
	<CommentForm {tweetId} rows={1} />
	<TweetList
		tweets={data.tweets.filter((tweet) => tweet.parentTweetId === tweetId)}
		comment={handleComment}
		tweetClicked={handleTweetClicked}
	/>
</div>
{#if tweet !== undefined}
	<CommentPopup {tweet} close={() => (tweet = undefined)} />
{/if}
