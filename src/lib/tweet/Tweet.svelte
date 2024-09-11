<script>
	import { formatDistanceToNow } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import Person from 'virtual:icons/material-symbols/person';

	export let tweet;
	export let avatarTop = 'top-4';

	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={() => {
		dispatch('tweetClicked', tweet);
	}}
	class="px-3.5 flex"
>
	<div class="flex flex-col mr-2">
		<slot name="upperBranch" />
		<div class="relative {avatarTop} mb-1.5">
			<Person />
		</div>
		<slot name="branch" />
	</div>
	<div class="mt-3.5">
		<a class="font-bold pr-2">{tweet.user.name}</a>{formatDistanceToNow(tweet.creationTime)}
		<div>{tweet.text}</div>
		<slot name="footer" />
	</div>
</div>
