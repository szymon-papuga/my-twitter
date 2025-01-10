import { test as setup } from '@playwright/test';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const authFile = path.join(
	dirname(fileURLToPath(import.meta.url)),
	'../playwright/.auth/user.json'
);

setup('authenticate', async ({ page }) => {
	// Perform authentication steps.
	await page.goto('localhost:5173/login');
	await page.getByLabel('E-mail').fill('test_user@gmail.com');
	await page.getByLabel('password').fill('password');
	await page.getByRole('button', { name: 'Login' }).click();
	// Wait for the final URL to ensure that the cookies are actually set.
	await page.waitForURL('http://localhost:5173/tweets');
	// End of authentication steps.
	await page.context().storageState({ path: authFile });
});
