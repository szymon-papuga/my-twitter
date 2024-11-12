<script>
	import '../../app.css';
</script>

<div class="flex justify-end items-center sticky top-0 z-40 h-10 bg-gray-200">
	<form method="post" action="/tweets?/logout" class="mr-5">
		<button type="submit">Logout</button>
	</form>
</div>
<div class="flex justify-center mt-6">
	<slot />
</div>
