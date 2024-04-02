<script>
	import Feed from '../lib/Feed.svelte';

	export let data;
</script>

<div class="flex justify-center mt-6">
	<Feed tweets={data.tweets} />
</div>
