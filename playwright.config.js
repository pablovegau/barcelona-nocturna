import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:4321',
    actionTimeout: 5000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  expect: {
    threshold: 0.2,
    toHaveScreenshot: { 
      threshold: 0.2,
      animation: 'disabled',
      mode: 'default',
      maxDiffPixelRatio: 0.1, // Aumentar tolerancia para animaciones infinitas del blob
    },
  },

  projects: [
    // ===== DESKTOP =====
    {
      name: 'Desktop Chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 }
      },
    },
    {
      name: 'Desktop Firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1440, height: 900 }
      },
    },
    {
      name: 'Desktop Safari',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1440, height: 900 }
      },
    },

    // ===== TABLET =====
    {
      name: 'iPad Pro',
      use: { 
        ...devices['iPad Pro'],
      },
    },
    {
      name: 'iPad',
      use: { 
        ...devices['iPad'],
      },
    },

    {
      name: 'iPhone 13',
      use: { 
        ...devices['iPhone 13'],
      },
    },
    {
      name: 'iPhone SE',
      use: { 
        ...devices['iPhone SE'],
      },
    },
    {
      name: 'Pixel 5',
      use: { 
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Galaxy S9+',
      use: { 
        ...devices['Galaxy S9+'],
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    port: 4321,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  outputDir: 'test-results',
});