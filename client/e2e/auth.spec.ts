import {expect, test} from '@playwright/test';
import {signIn} from './support/session';

test.describe('authentication', () => {
	test('the home page offers sign-in', async ({page}) => {
		await page.goto('/');
		await expect(page.getByRole('heading', {name: 'Welcome'})).toBeVisible();
		await expect(page.getByRole('link', {name: 'Sign in'}).first()).toBeVisible();
	});

	test('wrong credentials are rejected with a message', async ({page}) => {
		await signIn(page, 'e2e-admin', 'definitely-wrong');
		await expect(page.getByRole('alert')).toContainText('That username and password do not match');
		await expect(page).toHaveURL(/\/login$/);
	});

	test('an admin lands in the admin console', async ({page}) => {
		await signIn(page);
		await expect(page).toHaveURL(/\/admin/);
	});

	test('anonymous visitors are kept out of the app area', async ({page}) => {
		await page.goto('/app/forms');
		await expect(page).not.toHaveURL(/\/app/);
	});

	test('the session survives a reload and ends on sign-out', async ({page}) => {
		await signIn(page);
		await expect(page).toHaveURL(/\/admin/);
		await page.reload();
		await expect(page).toHaveURL(/\/admin/);

		await page.goto('/app/forms');
		await page.getByRole('button', {name: 'Account'}).click();
		await page.getByRole('menuitem', {name: 'Sign out'}).click();
		await expect(page).toHaveURL(/\/$/);
	});
});
