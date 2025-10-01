import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("GauchoGirls")).toBeVisible();
    await expect(page.getByText("anonymously rate your experience")).toBeVisible();
  });

  test("can navigate to leaderboard", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /leaderboard/i }).click();
    await expect(page).toHaveURL(/\/leaderboard/);
    await expect(page.getByText("Leaderboard")).toBeVisible();
  });

  test("can navigate to legal pages", async ({ page }) => {
    await page.goto("/");
    
    // TOS
    await page.getByRole("link", { name: "TOS" }).click();
    await expect(page).toHaveURL(/\/tos/);
    await expect(page.getByText("Terms of Service")).toBeVisible();
    
    // Privacy
    await page.goto("/");
    await page.getByRole("link", { name: "PRIVACY" }).click();
    await expect(page).toHaveURL(/\/privacy/);
    
    // Legal
    await page.goto("/");
    await page.getByRole("link", { name: "LEGAL" }).click();
    await expect(page).toHaveURL(/\/legal/);
    
    // Contact
    await page.goto("/");
    await page.getByRole("link", { name: "CONTACT" }).click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test("search redirects to profile page", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[name="q"]', "Jane Doe");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/profile\/jane-doe/);
  });
});
