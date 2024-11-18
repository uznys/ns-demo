import { type Page } from '@playwright/test';

export class Footer {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get dataBreachScannerLink() { return this.page.getByRole('link', { name: 'Data Breach Scanner' }) };
    get passwordSharerLink() { return this.page.getByRole('link', { name: 'Password Sharer' }) };
}
