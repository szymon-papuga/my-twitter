<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<h1>Login</h1>

<form method="POST" use:enhance>
	<label for="email">E-mail:</label><br />
	<input type="email" id="email" name="email" required /><br />
	<label for="password">Password:</label><br />
	<input type="password" id="password" name="password" required /><br /><br />
	<button type="submit">Login</button>
	{#if form?.error}
		<p style="color: red;">{form.error}</p>
	{/if}
</form>

<br /><a href="/signup">Sign Up</a>
