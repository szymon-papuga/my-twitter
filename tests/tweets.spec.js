import { test, expect } from '../playwright/fixtures';

test.describe.configure({ mode: 'parallel' });

test('when tweet clicked, then URL /tweets/{id}', async ({ page }) => {
	await page.goto('/tweets', { waitUntil: 'networkidle' });
	await page.getByText('This tweet is meant to be located').click();
	await expect(page).toHaveURL('/tweets/1');
});

test('when comment button clicked, then textbox visible', async ({ page }) => {
	await page.goto('/tweets', { waitUntil: 'networkidle' });
	await page.locator('#comment-button').first().click();
	await expect(page.getByPlaceholder('Add another tweet')).toBeVisible();
});

test('when comment submitted, then textbox should disappear', async ({ page }) => {
	await page.goto('/tweets', { waitUntil: 'networkidle' });
	await page.locator('#comment-button').first().click();
	await page.getByPlaceholder('Add another tweet').fill('foo');
	await page.getByRole('button', { name: 'Submit' }).click();
	await expect(page.getByPlaceholder('Add another tweet')).not.toBeVisible();
});

test('when close button clicked, then textbox should disappear', async ({ page }) => {
	await page.goto('/tweets', { waitUntil: 'networkidle' });
	await page.locator('#comment-button').first().click();
	await page.getByRole('button', { name: 'close' }).click();
	await expect(page.getByPlaceholder('Add another tweet')).not.toBeVisible();
});
