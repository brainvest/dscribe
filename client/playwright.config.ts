import path from 'node:path';
import {defineConfig, devices} from '@playwright/test';

const CLIENT_URL = 'http://localhost:4200';
const HOST_URL = 'http://localhost:5000';
const AUTH_URL = 'http://localhost:5001';
const isCi = !!process.env['CI'];
// Generated business assemblies (source.cs + <instance>.dll) and the Host's temp copies of them; git-ignored.
const IMPLEMENTATIONS_DIR = path.resolve(__dirname, 'e2e/.implementations');

/**
 * End-to-end suite: the real Angular client and the real Host (against the Metadata database configured in
 * server/Host/appsettings.Development.json), with a test-only auth server standing in for SampleAuthServer so
 * that no user is ever written to the shared Auth database. See docs/technical/e2e-testing.md.
 */
export default defineConfig({
	testDir: './e2e',
	globalSetup: './e2e/support/global-setup.ts',
	outputDir: './e2e/test-results',
	fullyParallel: false,
	workers: 1,
	retries: isCi ? 1 : 0,
	// The first request to an application makes the Host load its metadata from the remote database.
	timeout: 90_000,
	expect: {timeout: 30_000},
	reporter: [['list'], ['html', {outputFolder: './e2e/report', open: 'never'}]],
	use: {
		baseURL: CLIENT_URL,
		screenshot: 'on',
		trace: 'retain-on-failure',
	},
	projects: [{name: 'chromium', use: {...devices['Desktop Chrome'], viewport: {width: 1440, height: 900}}}],
	webServer: [
		{
			command: 'node e2e/support/fake-auth-server.mjs',
			url: `${AUTH_URL}/health`,
			reuseExistingServer: !isCi,
			timeout: 30_000,
		},
		{
			// Builds on demand.
			command: 'dotnet run --project ../server/Host/Host.csproj',
			url: `${HOST_URL}/api/appManagement/getAppInstancesInfoForHome`,
			reuseExistingServer: !isCi,
			timeout: 240_000,
			env: {
				ASPNETCORE_ENVIRONMENT: 'Development',
				ASPNETCORE_URLS: HOST_URL,
				// The checked-in settings point at a Linux home directory.
				GlobalConfiguration__ImplementationsDirectory: IMPLEMENTATIONS_DIR,
				GlobalConfiguration__TempDirectory: IMPLEMENTATIONS_DIR,
			},
		},
		{
			command: 'pnpm start',
			url: CLIENT_URL,
			reuseExistingServer: !isCi,
			timeout: 120_000,
		},
	],
});
