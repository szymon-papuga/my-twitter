import { test, expect } from '../playwright/fixtures';
test.describe.configure({ mode: 'parallel' });

test('when comment button clicked, then textbox visible', async ({ page }) => {
	await page.goto('/login');
	await page.waitForLoadState('networkidle');
	await page.locator('#comment-button').first().click();
	await expect(page.getByPlaceholder('Add another tweet')).toBeVisible();
});
