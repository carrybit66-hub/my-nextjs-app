import { test, expect } from "@playwright/test";

test.describe("Auth flow (Next.js + Supabase)", () => {
  test("ログインして /dashboard に入れる", async ({ page }) => {
    const email = process.env.E2E_EMAIL;
    const password = process.env.E2E_PASSWORD;

    expect(email, "E2E_EMAIL が未設定です（GitHub Secrets）").toBeTruthy();
    expect(password, "E2E_PASSWORD が未設定です（GitHub Secrets）").toBeTruthy();

    await page.goto("/login", { waitUntil: "domcontentloaded" });

    // メール入力（実装差に強い候補を並べる）
    const emailInput = page
      .locator(
        [
          'input[name="email"]',
          'input#email',
          'input[type="email"]',
          'input[autocomplete="email"]',
          'input[placeholder*="mail" i]',
          'input[aria-label*="mail" i]',
          'input[placeholder*="メール"]',
          'input[aria-label*="メール"]',
        ].join(",")
      )
      .first();

    await expect(emailInput).toBeVisible({ timeout: 60_000 });
    await emailInput.fill(email!);

    // パスワード入力
    const passwordInput = page
      .locator(
        [
          'input[name="password"]',
          'input#password',
          'input[type="password"]',
          'input[autocomplete="current-password"]',
          'input[placeholder*="password" i]',
          'input[aria-label*="password" i]',
          'input[placeholder*="パスワード"]',
          'input[aria-label*="パスワード"]',
        ].join(",")
      )
      .first();

    await expect(passwordInput).toBeVisible({ timeout: 60_000 });
    await passwordInput.fill(password!);

    // 送信ボタン（日本語/英語どちらでも）
    const submit = page
      .getByRole("button", { name: /ログイン|sign in|login/i })
      .first();

    await expect(submit).toBeVisible({ timeout: 30_000 });

    await Promise.all([
      page.waitForURL(/\/dashboard/i, { timeout: 60_000 }),
      submit.click(),
    ]);

    await expect(page).toHaveURL(/\/dashboard/i);
  });
});
