import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on',
  },
  expect: {
    timeout: 10_000,
  },
  timeout: 60_000,

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'], contextOptions: {
          permissions: ['clipboard-read']
        }
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 1200 }
      },
    },
  ],
});
