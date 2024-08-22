<script>
	import { createEventDispatcher } from 'svelte';
	import Tweet from './Tweet.svelte';
	import CommentForm from './CommentForm.svelte';

	export let tweet;

	const dispatch = createEventDispatcher();
</script>

	<button on:click={() => dispatch('close')}>close</button>
<div class="fixed top-8 border-2 bg-white w-2/5">
	<Tweet {tweet} />
	<CommentForm tweetId={tweet.id} on:close />
</div>
