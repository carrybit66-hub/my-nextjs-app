import { test, expect } from "@playwright/test";

test("Auth flow (Next.js + Supabase)", async ({ page }) => {
  const email = process.env.E2E_EMAIL!;
  const password = process.env.E2E_PASSWORD!;

  // ログイン画面へ
  await page.goto("/login", { waitUntil: "domcontentloaded" });

  // 本当に /login にいるか確認
  await expect(page).toHaveURL(/\/login/);

  // email input（柔軟に取得）
  const emailInput = page
    .getByLabel(/email/i)
    .or(page.getByPlaceholder(/email/i))
    .or(page.locator('input[type="email"]'));

  await expect(emailInput).toBeVisible();
  await emailInput.fill(email);

  // password input
  const passwordInput = page
    .getByLabel(/password/i)
    .or(page.getByPlaceholder(/password/i))
    .or(page.locator('input[type="password"]'));

  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(password);

  // ログインボタン
  await page.getByRole("button", { name: /log in|login|sign in/i }).click();

  // ダッシュボードへ遷移するのを待つ
  await page.waitForURL(/\/dashboard/, { timeout: 30_000 });

  // 念のため確認
  await expect(page).toHaveURL(/\/dashboard/);
});
