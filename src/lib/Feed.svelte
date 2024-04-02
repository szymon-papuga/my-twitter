<script>
	import Tweet from './Tweet.svelte';

	export let tweets;
</script>

<div class="w-2/5">
	{#each tweets as tweet (tweet.id)}
		<Tweet {tweet} />
	{/each}
</div>
