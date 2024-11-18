import { expect, type Page } from '@playwright/test';

export class DataBreachScannerPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get emailField() { return this.page.getByTestId('dbs-email-field') };
    get noBreachesFound() { return this.page.getByRole('heading', { name: 'No breaches found so far' }) };
    get pageIdentifier() { return this.page.locator('section').filter({ hasText: 'Have I been hacked? Find out' }) };
    get submitButton() { return this.page.getByTestId('dbs-submit-button') };

    async goto() {
        await this.page.goto('https://nordpass.com/have-i-been-hacked/');
    }

    async assertFoundBreachCount(count: number) {
        await expect(this.page.getByRole('heading', { name: `Your data was found in ${count} breaches` })).toBeVisible();
    }
}
