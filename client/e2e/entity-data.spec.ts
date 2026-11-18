import {expect, test} from '@playwright/test';
import {AUTH_URL, CAROLINE, fetchMetadata, HOST_URL, PASSWORD, USERNAME, type MetadataSnapshot} from './support/session';

// API-level checks of the generated business assembly and the business database (CarolineMain). The client does not
// show entity data yet, so these guard the backend the upcoming grids will rely on. Row contents are not asserted:
// the database is shared and changes.

let metadata: MetadataSnapshot;
let headers: Record<string, string>;

test.beforeAll(async ({request}) => {
	metadata = await fetchMetadata(request, CAROLINE.id);
	const login = await request.post(`${AUTH_URL}/auth/login`, {data: {username: USERNAME, password: PASSWORD}});
	const {accessToken} = await login.json();
	headers = {Authorization: `Bearer ${accessToken}`, AppInstance: String(CAROLINE.id)};
});

test.describe('Caroline: entity data from the generated business assembly', () => {
	test('every entity type can be listed and counted', async ({request}) => {
		for (const entity of Object.values(metadata.entityTypes)) {
			await test.step(entity.name, async () => {
				const list = await request.post(`${HOST_URL}/api/Entity/GetByFilter`, {
					headers,
					data: {entityTypeName: entity.name, skip: 0, take: 1000},
				});
				expect(list.status(), `GetByFilter ${entity.name}`).toBe(200);
				const rows = await list.json();
				expect(Array.isArray(rows)).toBe(true);

				const count = await request.post(`${HOST_URL}/api/Entity/CountByFilter`, {
					headers,
					data: {entityTypeName: entity.name},
				});
				expect(count.status(), `CountByFilter ${entity.name}`).toBe(200);
				expect(await count.json()).toBeGreaterThanOrEqual(rows.length);
			});
		}
	});

	test('rows use the property names of the metadata, in camelCase', async ({request}) => {
		const list = await request.post(`${HOST_URL}/api/Entity/GetByFilter`, {
			headers,
			data: {entityTypeName: 'MeasurementUnit', skip: 0, take: 1},
		});
		const [row] = await list.json();
		test.skip(!row, 'MeasurementUnit has no rows in the shared database right now');
		const expected = Object.values(metadata.entityTypes['MeasurementUnit'].properties)
			.filter((p) => p.generalUsage === 'PrimaryKey' || p.generalUsage === 'NormalData')
			.map((p) => p.name.charAt(0).toLowerCase() + p.name.slice(1));
		expect(Object.keys(row)).toEqual(expect.arrayContaining(expected));
	});

	test('requests without a token are rejected', async ({request}) => {
		const list = await request.post(`${HOST_URL}/api/Entity/GetByFilter`, {
			headers: {AppInstance: String(CAROLINE.id)},
			data: {entityTypeName: 'Customer', skip: 0, take: 1},
		});
		expect(list.status()).toBe(401);
	});
});
