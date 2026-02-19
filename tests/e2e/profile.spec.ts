import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test('should display user name and email', async ({ page }) => {
    // Navigate to the profile page
    await page.goto('/dashboard/profile');

    // Check if the user name is displayed
    const userName = await page.locator('h2.text-lg.font-semibold');
    await expect(userName).toBeVisible();

    // Check if the user email is displayed
    const userEmail = await page.locator('p.text-sm.text-muted-foreground');
    await expect(userEmail).toBeVisible();
  });
});
