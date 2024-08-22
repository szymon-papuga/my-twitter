<script>
	import { formatDistanceToNow } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import Person from 'virtual:icons/material-symbols/person';

	export let tweet;

	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={() => {
		dispatch('tweetClicked', tweet);
	}}
	class="p-3.5 flex"
>
	<div class="flex flex-col">
		<span class="relative top-0.5"><Person /></span>
		<slot name="branch" />
	</div>
	<div>
		<a class="font-bold pr-2">{tweet.user.name}</a>{formatDistanceToNow(tweet.creationTime)}
		<div>{tweet.text}</div>
		<slot name="footer" />
	</div>
</div>
