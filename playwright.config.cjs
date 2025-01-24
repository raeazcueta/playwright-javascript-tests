// @ts-check
import {
  defineConfig,
  devices,
} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '/**/*.e2e.js',
  globalSetup: require.resolve('./setup.js'),
  globalTeardown: require.resolve('./teardown.js'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  preserveOutput: 'failures-only',
  reporter: 'list',
  use: {
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 9'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 16'] },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
})

