<script>
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import autosize from 'svelte-autosize';
	import Person from 'virtual:icons/material-symbols/person';

	export let tweetId;

	const dispatch = createEventDispatcher();
</script>

<form
	method="POST"
	action="/tweets"
	use:enhance
	on:submit={() => dispatch('close')}
	class="p-4"
>
	<span class="relative top-1">
		<Person />
	</span>
	<textarea
		name="text"
		placeholder="Add another tweet"
		class="block outline-none text-xl resize-none w-full col-start-2 h-14"
		use:autosize
	/>
	<input type="hidden" name="parentId" value={tweetId} />
	<input
		type="submit"
		value="Submit"
		class="text-white bg-sky-400 font-bold rounded-full float-right w-28 h-8 col-start-3"
	/>
</form>

<style>
	form {
		display: grid;
		grid-template-columns: max-content auto min-content;
		gap: 8px;
	}
</style>
