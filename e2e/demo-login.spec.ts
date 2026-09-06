import { test, expect } from '@playwright/test';

test('usuario puede entrar con la cuenta demo desde la landing', async ({ page }) => {
  test.setTimeout(60000); // sube el timeout total del test

  await page.goto('/');
  await page.getByRole('button', { name: 'Ver demo sin registrarte' }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 40000 });
});