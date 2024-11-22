<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
	const user = form?.user;

	let password = $state(user?.password ?? '');
	let passwordConfirmed = $state('');
	let passwordsNotEqual = $derived(password !== passwordConfirmed);
</script>

<form method="POST" use:enhance>
	<label for="username">User Name:</label><br />
	<input value={user?.username ?? ''} type="text" id="username" name="username" required /><br />
	<label for="email">E-mail:</label><br />
	<input value={user?.email ?? ''} type="email" id="email" name="email" required /><br />
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
	{:else if form?.error}
		<p style="color: red;">{form.error}</p>
	{:else}
		<br />
	{/if}
	<button disabled={!password || passwordsNotEqual} type="submit">Sign Up</button>
</form>
