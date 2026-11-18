import {expect, request} from '@playwright/test';
import {AUTH_URL, CAROLINE, HOST_URL, PASSWORD, USERNAME} from './session';

/**
 * Business assemblies are generated from the metadata, never checked in: `ReleaseMetadata/GenerateCode` writes
 * `<ImplementationsDirectory>/<instance>/<instance>.dll` (it only reads the Metadata database). Doing it here keeps a
 * fresh checkout self-sufficient. The Host forgets its cached container after a successful generation, so the entity
 * endpoints work immediately, without a restart.
 */
export default async function globalSetup(): Promise<void> {
	const api = await request.newContext();
	try {
		const login = await api.post(`${AUTH_URL}/auth/login`, {data: {username: USERNAME, password: PASSWORD}});
		expect(login.ok(), 'login against the auth server').toBeTruthy();
		const {accessToken} = await login.json();
		const headers = {Authorization: `Bearer ${accessToken}`, AppInstance: String(CAROLINE.id)};

		const generated = await api.post(`${HOST_URL}/api/ReleaseMetadata/GenerateCode`, {headers, timeout: 240_000});
		expect(generated.ok(), 'POST /api/ReleaseMetadata/GenerateCode').toBeTruthy();
		const result = await generated.json();
		expect(result.success, `code generation: ${JSON.stringify(result.errors)}`).toBe(true);
	} finally {
		await api.dispose();
	}
}
