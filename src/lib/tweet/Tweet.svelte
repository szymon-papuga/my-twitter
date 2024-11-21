<script>
	import { formatDistanceToNow } from 'date-fns';
	import Person from 'virtual:icons/material-symbols/person';

	let {
		tweet,
		avatarTop = 'top-4',
		tweetClicked = () => {},
		upperBranch,
		branch,
		footer
	} = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div onclick={() => tweetClicked(tweet)} class="px-3.5 flex">
	<div class="flex flex-col mr-2">
		{@render upperBranch?.()}
		<div class="relative {avatarTop} mb-1.5">
			<Person />
		</div>
		{@render branch?.()}
	</div>
	<div class="mt-3.5">
		<a class="font-bold pr-2">{tweet.user.name}</a>{formatDistanceToNow(tweet.creationTime)}
		<div>{tweet.text}</div>
		{@render footer?.()}
	</div>
</div>
