import { test, expect } from "@playwright/test";

test("home page renders hero headline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Autonomously monitor markets, simulate trades, and deploy risk-aware strategies in seconds.")).toBeVisible();
});
