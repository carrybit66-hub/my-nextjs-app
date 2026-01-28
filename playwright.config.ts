import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
 webServer: {
  command: "npm run dev",
  url: "http://127.0.0.1:3000",
  timeout: 180_000,
  reuseExistingServer: !process.env.CI,
},
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
