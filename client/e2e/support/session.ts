import {expect, type APIRequestContext, type Page} from '@playwright/test';

export const USERNAME = process.env['E2E_USERNAME'] ?? 'e2e-admin';
export const PASSWORD = process.env['E2E_PASSWORD'] ?? 'e2e-password';
export const HOST_URL = 'http://localhost:5000';
export const AUTH_URL = 'http://localhost:5001';

/** The application instance of the Caroline demo (`Demo4Caroline`, id 1 in the Metadata database). */
export const CAROLINE = {id: 1, name: 'Demo4Caroline'} as const;

/** Signs in through the login page, as a user would. */
export async function signIn(page: Page, username = USERNAME, password = PASSWORD): Promise<void> {
	await page.goto('/login');
	await page.getByLabel('Username', {exact: true}).fill(username);
	await page.getByLabel('Password', {exact: true}).fill(password);
	await page.getByRole('button', {name: 'Sign in'}).click();
}

/** Picks an application in the drawer's switcher. */
export async function switchToApp(page: Page, name: string): Promise<void> {
	await page.getByTestId('app-switcher').click();
	await page.getByTestId('app-option').filter({hasText: name}).click();
	await expect(page.getByTestId('active-app-name')).toHaveText(name);
}

export type MetadataSnapshot = {
	entityTypes: Record<string, EntityTypeSnapshot>;
};

export type EntityTypeSnapshot = {
	name: string;
	singularTitle: string;
	pluralTitle: string;
	properties: Record<string, {name: string; generalUsage: string}>;
};

/** The metadata exactly as the Host serves it, fetched independently of the UI under test. */
export async function fetchMetadata(request: APIRequestContext, appInstanceId: number): Promise<MetadataSnapshot> {
	const login = await request.post(`${AUTH_URL}/auth/login`, {data: {username: USERNAME, password: PASSWORD}});
	expect(login.ok(), 'login against the auth server').toBeTruthy();
	const {accessToken} = await login.json();
	const response = await request.get(`${HOST_URL}/api/Metadata/GetComplete`, {
		headers: {Authorization: `Bearer ${accessToken}`, AppInstance: String(appInstanceId)},
	});
	expect(response.ok(), 'GET /api/Metadata/GetComplete').toBeTruthy();
	return response.json();
}
