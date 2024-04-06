<script>
	import { formatDistanceToNow } from 'date-fns';

	export let tweet;
</script>

<div class="border p-3.5">
	<div>
		<a class="font-bold pr-2">{tweet.user.name}</a>{formatDistanceToNow(tweet.creationTime)}
	</div>
	{tweet.text}
</div>
