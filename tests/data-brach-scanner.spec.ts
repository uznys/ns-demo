import { expect, test } from '@playwright/test';
import { DataBreachScannerPage } from './page-objects/data-breach-scanner-page';
import { HomePage } from './page-objects/home-page';
import { Footer } from './page-objects/footer';

test.describe('Data Breach Scanner page', () => {

  let dataBreachScannerPage: DataBreachScannerPage;

  test.beforeEach(async ({ page }) => {
    dataBreachScannerPage = new DataBreachScannerPage(page);
  })

  test('Navigate to page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    const footer = new Footer(page);
    await expect(footer.dataBreachScannerLink).toBeVisible();
    await footer.dataBreachScannerLink.click();

    await expect(dataBreachScannerPage.pageIdentifier).toBeVisible();
  });

  test('Scan email with breaches', async () => {
    const emailWithBreaches = 'donatas.uznys@gmail.com';
    await dataBreachScannerPage.goto();

    await dataBreachScannerPage.emailField.fill(emailWithBreaches);
    await dataBreachScannerPage.submitButton.click();

    await dataBreachScannerPage.assertFoundBreachCount(3);
  });

  test('Scan email without breaches', async () => {
    const emailWithoutBreaches = 'nonExistentEmail@gmail.com';
    await dataBreachScannerPage.goto();

    await dataBreachScannerPage.emailField.fill(emailWithoutBreaches);
    await dataBreachScannerPage.submitButton.click();

    await expect(dataBreachScannerPage.noBreachesFound).toBeVisible();
  });
})
