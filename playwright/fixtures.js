import { test as baseTest } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { createTestUser } from '../tests/testUtils';

export * from '@playwright/test';
export const test = baseTest.extend({
	// Use the same storage state for all tests in this worker.
	storageState: ({ workerStorageState }, use) => use(workerStorageState),

	// Authenticate once per worker with a worker-scoped fixture.
	workerStorageState: [
		async ({ browser }, use) => {
			const id = test.info().parallelIndex;
			const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

			if (fs.existsSync(fileName)) {
				// Reuse existing authentication state if any.
				await use(fileName);
				return;
			}

			// Important: make sure we authenticate in a clean environment by unsetting storage state.
			const page = await browser.newPage({ storageState: undefined });

			const email = await createTestUser();

			await page.goto(`http://${process.env.APP_HOST}:5173/login`);
			await page.getByLabel('E-mail').fill(email);
			await page.getByLabel('password').fill('password');
			await page.getByRole('button', { name: 'Login' }).click();
			// Wait for the final URL to ensure that the cookies are actually set.
			await page.waitForURL(`http://${process.env.APP_HOST}:5173/tweets`);

			await page.context().storageState({ path: fileName });
			await page.close();
			await use(fileName);
		},
		{ scope: 'worker' }
	]
});
