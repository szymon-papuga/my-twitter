<script>
	import { enhance } from '$app/forms';
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
</form>

<br /><a href="/signup">Sign Up</a>
