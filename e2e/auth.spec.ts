// e2e/auth.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Auth flow (Next.js + Supabase)", () => {
  test("ログインして /dashboard に入れる", async ({ page }) => {
    const email = process.env.E2E_EMAIL;
    const password = process.env.E2E_PASSWORD;

    if (!email || !password) {
      throw new Error("E2E_EMAIL / E2E_PASSWORD が未設定です (GitHub Secrets を確認)");
    }

    // まずログインへ
    await page.goto("/login", { waitUntil: "domcontentloaded" });

    // testidで確実に掴む
    const emailInput = page.getByTestId("email");
    const passwordInput = page.getByTestId("password");
    const submitBtn = page.getByTestId("login-submit");

    await expect(emailInput).toBeVisible({ timeout: 60_000 });
    await emailInput.fill(email);

    await expect(passwordInput).toBeVisible({ timeout: 60_000 });
    await passwordInput.fill(password);

    await Promise.all([
      page.waitForURL(/\/dashboard/, { timeout: 60_000 }),
      submitBtn.click(),
    ]);

    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("未ログインで /dashboard に行くと /login にリダイレクト", async ({ page }) => {
    await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/login/);
  });

  test("ログアウトすると /login に戻る", async ({ page }) => {
    const email = process.env.E2E_EMAIL;
    const password = process.env.E2E_PASSWORD;

    if (!email || !password) {
      throw new Error("E2E_EMAIL / E2E_PASSWORD が未設定です (GitHub Secrets を確認)");
    }

    await page.goto("/login", { waitUntil: "domcontentloaded" });

    await page.getByTestId("email").fill(email);
    await page.getByTestId("password").fill(password);

    await Promise.all([
      page.waitForURL(/\/dashboard/, { timeout: 60_000 }),
      page.getByTestId("login-submit").click(),
    ]);

    // あなたの実装に合わせて logout ボタン/リンクを調整
    // 例: data-testid を付けておくのが一番安定
    // <button data-testid="logout">Logout</button>
    const logout = page.getByTestId("logout");
    await logout.click();

    await page.waitForURL(/\/login/, { timeout: 60_000 });
    await expect(page).toHaveURL(/\/login/);
  });
});
