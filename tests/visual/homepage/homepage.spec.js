import { test, expect } from '@playwright/test';

function isMobileDevice(projectName) {
  const mobileDevices = ['iPhone 13', 'iPhone SE', 'Pixel 5', 'Galaxy S9+'];
  return mobileDevices.includes(projectName);
}

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('Base view', async ({ page }) => {
    await expect(page).toHaveScreenshot();
  });

  test('Base view - dark theme', async ({ page }) => {
    await page.click('#theme-toggle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot();
  });

  test('Scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 400));
    
    await expect(page).toHaveScreenshot();
  });

  test('Scroll - dark theme', async ({ page }) => {
    await page.click('#theme-toggle');
    await page.evaluate(() => window.scrollTo(0, 400));

    await expect(page).toHaveScreenshot();
  });

  test('Mobile menu', async ({ page }, testInfo) => {
    test.skip(!isMobileDevice(testInfo.project.name), 'Este test solo se ejecuta en dispositivos móviles');
    
    // Deshabilitar animaciones infinitas del blob antes de capturar
    await page.addStyleTag({
      content: `
        .blob {
          animation: none !important;
          transform: none !important;
        }
      `
    });
    
    await page.click('.topnav__control');
    await page.waitForTimeout(500); // Esperar que termine la animación

    await expect(page).toHaveScreenshot();
  });

  test('Mobile menu - dark theme', async ({ page }, testInfo) => {
    test.skip(!isMobileDevice(testInfo.project.name), 'Este test solo se ejecuta en dispositivos móviles');
    
    // Deshabilitar animaciones infinitas del blob antes de capturar
    await page.addStyleTag({
      content: `
        .blob {
          animation: none !important;
          transform: none !important;
        }
      `
    });
    
    await page.click('#theme-toggle');
    await page.waitForTimeout(500); // Esperar cambio de tema
    await page.click('.topnav__control');
    await page.waitForTimeout(500); // Esperar que termine la animación

    await expect(page).toHaveScreenshot();
  });

  // test('Components specific regions', async ({ page }) => {
  //   await page.setViewportSize({ width: 1280, height: 720 });
    
  //   // Screenshot solo del header principal (evitar elementos del dev server)
  //   const header = page.locator('header').first();
  //   await expect(header).toHaveScreenshot('header-component.png');
    
  //   // Skip hero test por ahora - requiere data-testid
  //   // const hero = page.locator('[data-testid="hero"]');
  //   // if (await hero.isVisible()) {
  //   //   await expect(hero).toHaveScreenshot('hero-component.png');
  //   // }
  // });
}); 