<script>
	import { run } from 'svelte/legacy';
	import { enhance } from '$app/forms';
	import autosize from 'svelte-autosize';
	import Person from 'virtual:icons/material-symbols/person';

	const stylesPerRows = {
		'1': {
			formStyle: '',
			textAreaStyle: 'grid-column-end: 3;'
		},
		'2': {
			formStyle: 'grid-template-rows: max-content max-content;',
			textAreaStyle: 'grid-column-end: 4;'
		}
	};

	let { tweetId, rows, close = () => {} } = $props();

	// Looks like checks like that are not very popular in frontend frameworks
	// Leaving it for now, can be handled nicely with TS, I guess
	run(() => {
		if (rows !== 1 && rows !== 2) {
			throw Error(`rows must be 1 or 2 but was: ${rows}`);
		}
	});

	let style = $derived(stylesPerRows[rows]);
</script>

<form
	method="POST"
	action="/tweets?/comment"
	use:enhance={() => close()}
	class="p-4"
	style={style.formStyle}
>
	<span class="relative top-1">
		<Person />
	</span>
	<textarea
		name="text"
		placeholder="Add another tweet"
		class="block outline-none text-xl resize-none w-full col-start-2"
		rows="1"
		required
		maxlength="140"
		style={style.textAreaStyle}
		use:autosize
		onfocus={() => (rows = 2)}
	></textarea>
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
