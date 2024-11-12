<script>
	import { createEventDispatcher } from 'svelte';
	import Tweet from './Tweet.svelte';
	import CommentForm from './CommentForm.svelte';

	export let tweet;

	const dispatch = createEventDispatcher();
</script>

<div class="fixed top-8 border-2 bg-white w-2/5 z-50">
	<div><button on:click={() => dispatch('close')} class="float-right">close</button></div>
	<Tweet {tweet} />
	<CommentForm tweetId={tweet.id} rows={2} on:close />
</div>
