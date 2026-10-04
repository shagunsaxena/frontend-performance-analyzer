import  {test, expect} from '@playwright/test';

test("Should load the Frontend Performance Analyzer", async ({ page }) => {

    await page.goto("/");

    await expect(page.getByRole("heading",
        {
        name:"Frontend Performance Analyzer"
        }
    )).toBeVisible();

    await expect(
        page.getByLabel("Website URL")
    ).toBeVisible();

    await expect(
        page.getByRole("button", 
            { name: "Analyze" }
        )).toBeVisible();
});

test("Should allow the user to enter a website URL", async ({
  page,
}) => {
  await page.goto("/");

  const urlInput = page.getByLabel("Website URL");

  await urlInput.fill("https://example.com");

  await expect(urlInput).toHaveValue("https://example.com");
});

test.describe("Lighthouse analysis", () => {
  
  test("Should analyze a valid website URL", async ({ page }) => {
    await page.goto("/");

    const urlInput = page.getByLabel("Website URL");

    const analyzeButton = page.getByRole("button", {
      name: "Analyze",
    });

    await urlInput.fill("https://example.com");

    await analyzeButton.click();

    await expect(
      page.getByText("Performance Score")
    ).toBeVisible({
      timeout: 60_000,
    });

    await expect(
      page.getByText("Core Web Vitals & Performance Metrics")
    ).toBeVisible();

    await expect(
      page.getByText("Performance Overview")
    ).toBeVisible();

    await expect(
      page.getByText("Recommendations")
    ).toBeVisible();
  });
});

test("Should require a website URL", async ({ page }) => {
  await page.goto("/");

  const urlInput = page.getByLabel("Website URL");

  const analyzeButton = page.getByRole("button", {
    name: "Analyze",
  });

  await expect(urlInput).toHaveAttribute("required", "");

  await analyzeButton.click();

  await expect(urlInput).toBeFocused();
});

test("Should reject an invalid website URL", async ({ page }) => {
  await page.goto("/");

  const urlInput = page.getByLabel("Website URL");

  const analyzeButton = page.getByRole("button", {
    name: "Analyze",
  });

  await urlInput.fill("not-a-valid-url");

  await expect(urlInput).toHaveAttribute("type", "url");

  await analyzeButton.click();

  await expect(urlInput).toBeFocused();
});

test("Should show the loading state while analyzing", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName === "webkit",
    "Loading-state test is skipped on WebKit due to browser instability in this environment"
  );

  await page.route("**/api/performance**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2_000));

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: {
          url: "https://example.com",
          score: 96,
          metrics: {
            lcp: 1.2,
            inp: null,
            cls: 0.01,
            fcp: 1.0,
          },
          recommendations: [],
        },
      }),
    });
  });

  await page.goto("/");

  const urlInput = page.getByLabel("Website URL");

  const analyzeButton = page.getByRole("button", {
    name: "Analyze",
  });

  await urlInput.fill("https://example.com");

  await analyzeButton.click();

  await expect(
    page.getByText("Analyzing website...")
  ).toBeVisible();


  await expect(
    page.getByText("Performance Score")
  ).toBeVisible();

});