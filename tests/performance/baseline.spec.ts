import { test, expect } from '@playwright/test';

test.describe('Performance Baseline Tests', () => {
  test('homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' });

    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds (generous baseline)
    expect(loadTime).toBeLessThan(5000);

    console.log(`Homepage load time: ${loadTime}ms`);
  });

  test('measures Core Web Vitals', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Get Core Web Vitals using Performance API
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const metrics: any = {};

        // Get FCP (First Contentful Paint)
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          metrics.fcp = fcpEntry.startTime;
        }

        // Get LCP (Largest Contentful Paint)
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
          observer.disconnect();
          resolve(metrics);
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });

        // Fallback in case LCP observer doesn't fire
        setTimeout(() => resolve(metrics), 3000);
      });
    });

    console.log('Core Web Vitals:', metrics);

    // Baseline thresholds (allowing 10% degradation buffer from current state)
    if (metrics.fcp) {
      expect(metrics.fcp).toBeLessThan(3000); // FCP < 3s
    }
    if (metrics.lcp) {
      expect(metrics.lcp).toBeLessThan(3500); // LCP < 3.5s
    }
  });

  test('verifies no console errors during page load', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Should have no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('validates critical images loaded', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that hero image is loaded
    const heroImage = page.locator('img').first();
    await expect(heroImage).toBeVisible();

    // Verify image has loaded (not broken)
    const isImageLoaded = await heroImage.evaluate((img: HTMLImageElement) => {
      return img.complete && img.naturalHeight !== 0;
    });

    expect(isImageLoaded).toBeTruthy();
  });

  test('measures JavaScript bundle size via Network API', async ({ page }) => {
    const resourceSizes: { [key: string]: number } = {};

    page.on('response', async (response) => {
      const url = response.url();
      const contentType = response.headers()['content-type'] || '';

      // Track JS bundles
      if (url.includes('.js') && contentType.includes('javascript')) {
        try {
          const buffer = await response.body();
          resourceSizes[url] = buffer.length;
        } catch (e) {
          // Some resources might not be accessible
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('JavaScript bundle sizes:', resourceSizes);

    // Calculate total JS size
    const totalJsSize = Object.values(resourceSizes).reduce((sum, size) => sum + size, 0);
    console.log(`Total JavaScript size: ${(totalJsSize / 1024).toFixed(2)} KB`);

    // Should be reasonable (allowing for current state)
    expect(totalJsSize).toBeLessThan(1000000); // < 1MB total JS
  });

  test('GTM and tracking scripts load correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if GTM dataLayer exists
    const hasDataLayer = await page.evaluate(() => {
      return typeof window !== 'undefined' && 'dataLayer' in window;
    });

    expect(hasDataLayer).toBeTruthy();

    console.log('GTM dataLayer exists:', hasDataLayer);
  });

  test('form submission flow works', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to form (if not visible)
    const form = page.locator('form').first();
    await form.scrollIntoViewIfNeeded();

    // Fill out form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');

    // Select service from dropdown
    await page.selectOption('select[name="service"]', { index: 1 });

    // Note: We don't actually submit to avoid sending test data
    // Just verify form elements are functional
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });
});
