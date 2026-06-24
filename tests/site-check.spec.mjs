import { test, expect } from "@playwright/test";

const baseUrl = process.env.SITE_URL || "http://127.0.0.1:4174";

test("homepage loads and lead form works", async ({ page }) => {
  await page.goto(baseUrl);
  await expect(page.getByRole("heading", { name: "藍星科技", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /開始 AI 診斷/ })).toBeVisible();

  await page.locator("#services").scrollIntoViewIfNeeded();
  await page.getByRole("tab", { name: "企業流程" }).click();
  await expect(page.getByRole("heading", { name: "AI 流程自動化" })).toBeVisible();

  await page.getByLabel("姓名").fill("藍星測試");
  await page.getByLabel("聯絡方式").fill("0970-700-419");
  await page.getByLabel("需求類型").selectOption("企業流程自動化");
  await page.getByLabel("目前想解決的問題").fill("想把客戶諮詢和回覆流程整理成 AI 工作流。");
  await page.getByRole("button", { name: /送出需求/ }).click();
  await expect(page.getByRole("status")).toContainText("已收到 藍星測試 的需求");
});

test("mobile navigation opens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl);
  await page.getByRole("button", { name: "開啟選單" }).click();
  const mainNav = page.getByRole("navigation", { name: "主要導覽" });
  await expect(mainNav).toBeVisible();
  await mainNav.getByRole("link", { name: "服務入口" }).click();
  await expect(page.locator("#services")).toBeInViewport();
});
