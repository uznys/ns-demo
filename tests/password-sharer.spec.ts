import { test, expect, type Page, type Browser } from '@playwright/test';
import { PasswordSharerPage } from './page-objects/password-sharer-page';

test.describe('Password Sharer page', () => {

  let passwordSharerPage: PasswordSharerPage;

  test.beforeEach(async ({ page }) => {
    passwordSharerPage = new PasswordSharerPage(page);
    await passwordSharerPage.goto();
  })

  test('Create, retrieve and delete a password', async ({ page, browser, browserName }) => {
    test.skip(browserName === 'webkit', 'Webkit cannot read clipboard: https://github.com/microsoft/playwright/issues/13037');

    const SECRET_TEXT = 'Super secret stuff ☺ 🔥'; // TODO: Check what are the limits

    await test.step('Create a password', async () => {
      await passwordSharerPage.textAreaForSecret.fill(SECRET_TEXT);
      await passwordSharerPage.generateSecureLinkButton.click();

      await passwordSharerPage.copySecureLinkButton.click();
    })

    await test.step('Retrieve the password', async () => {
      const secureLink = await readClipboard(page);
      const differentBrowserPage = await newPageInDifferentBrowser(browser);
      await differentBrowserPage.goto(secureLink);

      const passwordSharerPageInDifferentBrowser = new PasswordSharerPage(differentBrowserPage);

      await expect(passwordSharerPageInDifferentBrowser.textAreaForSecret).toContainText('*****');
      await passwordSharerPageInDifferentBrowser.viewSecretButton.click();
      await expect(passwordSharerPageInDifferentBrowser.textAreaForSecret).toHaveText(SECRET_TEXT);
      await passwordSharerPageInDifferentBrowser.copySecretButton.click();

      const retrievedSecretText = await readClipboard(differentBrowserPage);
      expect(retrievedSecretText).toBe(SECRET_TEXT);
    })

    await test.step('Delete the retrieved password', async () => {
      await passwordSharerPage.deleteSecureLinkButton.click();
      await expect(passwordSharerPage.alertItemNotAvailable).toBeVisible();
    })
  });

  test('Create and delete an unretrieved password', async ({ page, browser, browserName }) => {
    test.skip(browserName === 'webkit', 'Webkit cannot read clipboard: https://github.com/microsoft/playwright/issues/13037');

    const SECRET_TEXT = 'Super secret stuff ☺ 🔥';

    await test.step('Create a password', async () => {
      await passwordSharerPage.textAreaForSecret.fill(SECRET_TEXT);
      await passwordSharerPage.generateSecureLinkButton.click();

      await passwordSharerPage.copySecureLinkButton.click();
    })

    await test.step('Delete the unretrieved password', async () => {
      await passwordSharerPage.deleteSecureLinkButton.click();
      await expect(passwordSharerPage.alertSecretLinkDeleted).toBeVisible();
    })

    await test.step('Verify password cannot be retrieved', async () => {
      const secureLink = await readClipboard(page);
      const differentBrowserPage = await newPageInDifferentBrowser(browser);
      await differentBrowserPage.goto(secureLink);

      const passwordSharerPageInDifferentBrowser = new PasswordSharerPage(differentBrowserPage);

      await expect(passwordSharerPageInDifferentBrowser.secureLinkExpired).toBeVisible();
    })
  });
})

async function newPageInDifferentBrowser(browser: Browser) {
  const newBrowserContext = await browser.newContext();
  return await newBrowserContext.newPage();
}

async function readClipboard(page: Page) {
  const handle = await page.evaluateHandle(() => navigator.clipboard.readText());
  return await handle.jsonValue();
}
