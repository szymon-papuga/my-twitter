<script>
	import { enhance } from '$app/forms';

	let password = $state('');
	let passwordConfirmed = $state('');
	let passwordsNotEqual = $derived(password !== passwordConfirmed);
</script>

<form method="POST" use:enhance>
	<label for="username">User Name:</label><br />
	<input type="text" id="username" name="username" required /><br />
	<label for="email">E-mail:</label><br />
	<input type="email" id="email" name="email" required /><br />
	<label for="password">Password:</label><br />
	<input bind:value={password} type="password" id="password" name="password" required /><br />
	<label for="confirm_password">Confirm Password:</label><br />
	<input
		bind:value={passwordConfirmed}
		type="password"
		id="confirm_password"
		name="confirm_password"
		required
	/><br />
	{#if passwordsNotEqual}
		<p style="color: red;">Passwords do not match!</p>
	{:else}
		<br />
	{/if}
	<button disabled={!password || passwordsNotEqual} type="submit">Sign Up</button>
</form>
