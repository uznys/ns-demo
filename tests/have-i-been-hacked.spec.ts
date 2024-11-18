import { expect, test } from '@playwright/test';
import { HaveIBeenHackedPage } from './page-objects/have-i-been-hacked-page';

test.describe('Have I Been Hacked page', () => {

  let haveIBeenHackedPage: HaveIBeenHackedPage;

  test.beforeEach(async ({ page }) => {
    haveIBeenHackedPage = new HaveIBeenHackedPage(page);
    await haveIBeenHackedPage.goto();
  })

  test('Scan email with breaches', async () => {
    const emailWithBreaches = 'donatas.uznys@gmail.com'
    await haveIBeenHackedPage.dataBreachScannerEmailField.fill(emailWithBreaches);
    await haveIBeenHackedPage.dataBreachScannerSubmitButton.click();
    await haveIBeenHackedPage.assertFoundBreachCount(3);
  });

  test('Scan email without breaches', async () => {
    const emailWithoutBreaches = 'nonExistentEmail@gmail.com'
    await haveIBeenHackedPage.dataBreachScannerEmailField.fill(emailWithoutBreaches);
    await haveIBeenHackedPage.dataBreachScannerSubmitButton.click();
    await expect(haveIBeenHackedPage.noBreachesFound).toBeVisible();
  });
})
