<script>
	import TweetWithFooter from './TweetWithFooter.svelte';

	export let tweets;
</script>

<div class="flex flex-col divide-y">
	{#if tweets.length === 1}
		<TweetWithFooter tweet={tweets[0]} />
	{:else if tweets.length === 2}
		<TweetWithFooter tweet={tweets[0]}>
			<div id="branch" class="h-full mt-1" />
		</TweetWithFooter>
		<TweetWithFooter tweet={tweets[1]} />
	{:else if tweets.length >= 3}
		<TweetWithFooter tweet={tweets[0]}>
			<div id="branch" class="h-full mt-1" />
		</TweetWithFooter>
		<TweetWithFooter tweet={tweets[1]} />
	{/if}
</div>

<style>
	#branch {
		width: 2px;
		background-color: rgb(207, 217, 222);
		margin-left: auto;
		margin-right: auto;
	}
</style>
