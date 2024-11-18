import { type Page } from '@playwright/test';

export class PasswordSharerPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get alertItemNotAvailable() { return this.page.getByTestId('alert-item-not-available') };
    get alertSecretLinkDeleted() { return this.page.getByTestId('alert-secret-link-deleted') };
    get copySecretButton() { return this.page.getByTestId('password-sharer-copy-secret-button') };
    get copySecureLinkButton() { return this.page.getByTestId('password-sharer-copy-secure-link-button') };
    get deleteSecureLinkButton() { return this.page.getByTestId('password-sharer-delete-secure-link-button') };
    get generateSecureLinkButton() { return this.page.getByTestId('password-sharer-generate-secure-link-button') };
    get secureLinkExpired() { return this.page.getByTestId('password-sharer-receiver-expired-screen-hero-heading') };
    get textAreaForSecret() { return this.page.locator('textarea[name="secret"]') };
    get viewSecretButton() { return this.page.getByTestId('password-sharer-view-secret-button') };

    async goto() {
        await this.page.goto('https://nordpass.com/password-sharer/');
    }
}
