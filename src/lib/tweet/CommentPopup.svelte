<script>
	import { createEventDispatcher } from 'svelte';
	import Tweet from './Tweet.svelte';
	import CommentForm from './CommentForm.svelte';

	export let tweet;

	const dispatch = createEventDispatcher();
</script>

<div class="fixed top-8 border-2 h-52 bg-white w-2/5">
	<button on:click={() => dispatch('close')}>close</button>
	<Tweet {tweet} />
	<CommentForm tweetId={tweet.id} on:close />
</div>
