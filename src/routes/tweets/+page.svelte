<script>
	import TweetList from '$lib/tweet/TweetList.svelte';
	import { browser } from '$app/environment';
	import CommentPopup from '$lib/tweet/CommentPopup.svelte';

	export let data;

	let tweet;
</script>

<div class="w-2/5 border">
	<TweetList
		tweets={data.tweets}
		on:comment={(event) => (tweet = event.detail)}
		on:tweetClicked={(event) => {
			if (browser) {
				// to prevent error window is not defined, because it's SSR
				window.location.href = `/tweets/${event.detail.id}`;
			}
		}}
	/>
</div>
{#if tweet !== undefined}
	<CommentPopup {tweet} on:close={() => (tweet = undefined)} />
{/if}
