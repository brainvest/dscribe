import {expect, test} from '@playwright/test';
import {CAROLINE, fetchMetadata, signIn, switchToApp, type MetadataSnapshot} from './support/session';

let metadata: MetadataSnapshot;

test.beforeAll(async ({request}) => {
	metadata = await fetchMetadata(request, CAROLINE.id);
});

test.describe('Caroline: forms defined by the metadata', () => {
	test.beforeEach(async ({page}) => {
		await signIn(page);
		await expect(page).toHaveURL(/\/admin/);
		// A client-side navigation keeps the in-memory session; a full page load would restore it first anyway.
		await page.goto('/app/forms');
		await expect(page.getByTestId('app-switcher')).toBeVisible();
	});

	test('both application instances are offered in the switcher', async ({page}) => {
		await page.getByTestId('app-switcher').click();
		await expect(page.getByTestId('app-option').filter({hasText: CAROLINE.name})).toBeVisible();
		await expect(page.getByTestId('app-option')).toHaveCount(2);
	});

	test('nothing is shown before an application is picked', async ({page}) => {
		await expect(page.getByTestId('form-card')).toHaveCount(0);
		await expect(page.getByTestId('active-app-name')).toHaveText('Select application');
	});

	test('every form of the metadata is listed, as cards and in the drawer', async ({page}) => {
		await switchToApp(page, CAROLINE.name);

		const expected = Object.values(metadata.entityTypes).map((e) => e.pluralTitle);
		expect(expected.length, 'Caroline defines forms').toBeGreaterThan(0);

		await expect(page.getByTestId('form-card')).toHaveCount(expected.length);
		await expect(page.getByTestId('drawer-form-link')).toHaveCount(expected.length);
		for (const title of expected) {
			await expect(page.getByTestId('form-card').filter({hasText: title})).toBeVisible();
			await expect(page.getByTestId('drawer-form-link').filter({hasText: title})).toBeVisible();
		}
		await page.screenshot({path: 'e2e/screenshots/caroline-forms-index.png', fullPage: true});
	});

	test('each form opens and shows the fields its metadata defines', async ({page}) => {
		await switchToApp(page, CAROLINE.name);
		await expect(page.getByTestId('form-card')).not.toHaveCount(0);

		for (const entity of Object.values(metadata.entityTypes)) {
			await test.step(`form ${entity.name}`, async () => {
				const editableCount = Object.values(entity.properties).filter(
					(p) => p.generalUsage === 'NormalData' || p.generalUsage === 'ForeignKey',
				).length;
				const card = page.getByTestId('form-card').filter({hasText: entity.pluralTitle});
				await expect(card).toContainText(`${editableCount} fields`);
				await card.click();
				await expect(page).toHaveURL(new RegExp(`/app/forms/${entity.name}$`));
				await expect(page.getByTestId('form-title')).toHaveText(entity.singularTitle);
				await expect(page.getByTestId('entity-form')).toBeVisible();

				// Primary keys and navigation properties/lists are hidden on insert by the metadata's own facets,
				// so every remaining property is a normal-data or foreign-key field.
				const editable = Object.values(entity.properties).filter(
					(p) => p.generalUsage === 'NormalData' || p.generalUsage === 'ForeignKey',
				);
				expect(editable.length, `${entity.name} has editable fields`).toBeGreaterThan(0);
				for (const property of editable) {
					await expect(page.getByTestId(`field-${property.name}`)).toBeVisible();
				}
				await page.screenshot({path: `e2e/screenshots/form-${entity.name}.png`, fullPage: true});
				await page.getByRole('link', {name: 'Forms', exact: true}).first().click();
				await expect(page.getByTestId('form-card')).not.toHaveCount(0);
			});
		}
	});

	test('a form can be opened from the drawer', async ({page}) => {
		await switchToApp(page, CAROLINE.name);
		await page.getByTestId('drawer-form-link').filter({hasText: 'Customers'}).click();
		await expect(page.getByTestId('form-title')).toHaveText('Customer');
		await expect(page.getByTestId('field-Name')).toBeVisible();
	});

	test('a form link without a picked application asks for one', async ({page}) => {
		// A full page load forgets the picked application: the selection lives in memory only.
		await page.goto('/app/forms/Customer');
		await expect(page.getByTestId('form-no-app')).toBeVisible();
	});
});
