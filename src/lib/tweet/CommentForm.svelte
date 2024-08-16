<script>
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import autosize from 'svelte-autosize';

	export let tweetId;

	const dispatch = createEventDispatcher();
</script>

<form
	method="POST"
	action="/tweets"
	use:enhance
	on:submit={() => dispatch('close')}
	class="p-4 gap-x-3"
>
	<textarea
		name="text"
		placeholder="Add another tweet"
		class="row-start-1 row-end-4 outline-none text-xl resize-none"
		use:autosize
	/>
	<input type="hidden" name="parentId" value={tweetId} />
	<input
		type="submit"
		value="Submit"
		class="text-white bg-sky-400 font-bold rounded-full rows-start-2 row-end-3"
	/>
</form>

<style>
	form {
		display: grid;
		grid-template-columns: 75% auto;
		grid-template-rows: auto 70% auto;
	}
</style>
