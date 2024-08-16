<script>
	import TweetWithFooter from './TweetWithFooter.svelte';

	export let tweet;
</script>

<div class="flex flex-col">
	<TweetWithFooter {tweet}>
		<div id="branch" />
	</TweetWithFooter>
</div>

<style>
	#branch {
		width: 2px;
		background-color: rgb(207, 217, 222);
		margin-left: auto;
		margin-right: auto;
		display: flex;
	}
</style>
