import { test, expect } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

const envTestPath = path.join(process.cwd(), ".env.test");
if (fs.existsSync(envTestPath)) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config({ path: envTestPath });
}

const email = process.env.E2E_EMAIL!;
const password = process.env.E2E_PASSWORD!;

test.describe("Auth flow (Next.js + Supabase)", () => {
  test("未ログインで /dashboard → /login にリダイレクトされる", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("ログイン → /dashboard に入れる", async ({ page }) => {
    await page.goto("/login");

    // loginフォームがこのname属性である想定（違う場合は下の「4)」参照）
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill(password);

    await Promise.all([
      page.waitForURL(/\/dashboard/),
      page.locator('button[type="submit"]').click(),
    ]);

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText("Dashboard")).toBeVisible();
  });

  test("ログアウト → /login に戻る", async ({ page }) => {
    // 先にログイン
    await page.goto("/login");
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill(password);
    await Promise.all([
      page.waitForURL(/\/dashboard/),
      page.locator('button[type="submit"]').click(),
    ]);

    // ログアウト（ヘッダーのLogoutボタンを押す）
    await page.getByRole("button", { name: "Logout" }).click();

    // ルーター遷移で /login に戻る
    await expect(page).toHaveURL(/\/login/);
  });
});
