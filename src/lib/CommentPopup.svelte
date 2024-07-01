<script>
	import { createEventDispatcher } from 'svelte';
	import Tweet from './Tweet.svelte';

	export let tweet;

	const dispatch = createEventDispatcher();
</script>

<div class="fixed top-8 border-2 h-52 bg-white w-2/5">
	<button on:click={() => dispatch('close')}>close</button>
	<Tweet {tweet} />
	<form method="POST">
		<textarea name="text" />
		<input type="hidden" name="parentId" value={tweet.id} />
		<input type="submit" value="Submit" />
	</form>
</div>
