import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://firsttrip.com',
  },
  reporter: [['list'], ['html', { outputFolder: 'reports' }]],
});
