import { test, expect } from "@playwright/test";

test("Auth flow (Next.js + Supabase)", async ({ page }) => {
  const email = process.env.E2E_EMAIL!;
  const password = process.env.E2E_PASSWORD!;

  // /loginへ
  await page.goto("/login", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/login/);

  // 画面が描画されるまで少し待つ（CI対策）
  await page.waitForLoadState("networkidle");

  // email input: label/placeholderに依存せず、HTML属性で広く拾う
  const emailInput = page
    .locator(
      [
        'input[name="email"]',
        "input#email",
        'input[type="email"]',
        'input[autocomplete="email"]',
        'input[placeholder*="mail" i]',
        'input[aria-label*="mail" i]',
      ].join(", ")
    )
    .first();

  await expect(emailInput).toBeVisible({ timeout: 60_000 });
  await emailInput.fill(email);

  // password input
  const passwordInput = page
    .locator(
      [
        'input[name="password"]',
        "input#password",
        'input[type="password"]',
        'input[autocomplete="current-password"]',
        'input[placeholder*="pass" i]',
        'input[aria-label*="pass" i]',
      ].join(", ")
    )
    .first();

  await expect(passwordInput).toBeVisible({ timeout: 60_000 });
  await passwordInput.fill(password);

  // ログインボタン（英/日どちらでも拾う）
  await page
    .getByRole("button", { name: /log in|login|sign in|ログイン/i })
    .click();

  // ダッシュボードへ
  await page.waitForURL(/\/dashboard/, { timeout: 60_000 });
  await expect(page).toHaveURL(/\/dashboard/);
});
