<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance>
	<label for="username">User Name:</label><br />
	<input type="text" id="username" name="username" required /><br />
	<label for="email">E-mail:</label><br />
	<input type="email" id="email" name="email" required /><br />
	<label for="password">Password:</label><br />
	<input type="password" id="password" name="password" required /><br /><br />
	<button type="submit">Sign Up</button>
</form>
