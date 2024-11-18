import { expect, type Page } from '@playwright/test';

export class HaveIBeenHackedPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get dataBreachScannerEmailField() { return this.page.getByTestId('dbs-email-field') };
    get dataBreachScannerSubmitButton() { return this.page.getByTestId('dbs-submit-button') };
    get noBreachesFound() { return this.page.getByRole('heading', { name: 'No breaches found so far' }) };

    async goto() {
        await this.page.goto('https://nordpass.com/have-i-been-hacked/');
    }

    async assertFoundBreachCount(count: number) {
        await expect(this.page.getByRole('heading', { name: 'Your data was found in ' + count })).toBeVisible();
    }
}
