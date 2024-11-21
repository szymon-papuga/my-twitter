<script>
	import TweetList from '$lib/tweet/TweetList.svelte';
	import { browser } from '$app/environment';
	import CommentPopup from '$lib/tweet/CommentPopup.svelte';

	let { data } = $props();

	let tweet = $state();
</script>

<div class="w-2/5 border">
	<TweetList
		tweets={data.tweets}
		comment={(tweetBeingCommented) => (tweet = tweetBeingCommented)}
		tweetClicked={(clicked) => {
			if (browser) {
				// to prevent error window is not defined, because it's SSR
				window.location.href = `/tweets/${clicked.id}`;
			}
		}}
	/>
</div>
{#if tweet !== undefined}
	<CommentPopup {tweet} close={() => (tweet = undefined)} />
{/if}
