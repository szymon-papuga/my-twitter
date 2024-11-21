<script>
	import Tweet from './Tweet.svelte';
	import CommentForm from './CommentForm.svelte';

	let { tweet, close } = $props();
</script>

<div class="fixed top-8 border-2 bg-white w-2/5 z-50">
	<div><button onclick={() => close()} class="float-right">close</button></div>
	<Tweet {tweet} />
	<CommentForm tweetId={tweet.id} rows={2} {close} />
</div>
