<script>
	import { formatDistanceToNow } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import ChatBubbleOutline from 'virtual:icons/material-symbols/chat-bubble-outline';

	export let tweet;

	const dispatch = createEventDispatcher();
</script>

<div class="border p-3.5">
	<div>
		<a class="font-bold pr-2">{tweet.user.name}</a>{formatDistanceToNow(tweet.creationTime)}
	</div>
	{tweet.text}
	<div class="mt-1 h-5 relative right-1">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			id="comment-button"
			on:click={() => {
				dispatch('comment', tweet);
			}}
		>
			<div id="comment-icon">
				<ChatBubbleOutline
					style="margin: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
				/>
			</div>
			12
		</div>
	</div>
</div>

<style>
	#comment-button {
		display: inline-flex;
		align-items: center;
		/* margin-left: -10px; */
	}

	#comment-icon {
		/* don't take the whole line */
		display: inline-block;
		/* transition the background change */
		transition: background-color 0.25s;
		/* height of the icon */
		height: 2.25em;
		/* width of the icon */
		width: 2.25em;
		/* space between the icon and the background edge */
		padding: 0.25em;
		/* make it rounded */
		border-radius: 50%;
		position: relative;
		margin-bottom: -5px;
		margin-left: -5px;
		margin-right: -5px;
		margin-top: -5px;
	}

	#comment-button:hover #comment-icon {
		background-color: rgba(29, 155, 240, 0.094);
	}

	#comment-button:hover {
		color: dodgerblue;
	}
</style>
