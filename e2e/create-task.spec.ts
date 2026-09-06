import { test, expect } from '@playwright/test';

test('usuario demo puede crear una tarea dentro de un proyecto', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('/');
  await page.getByRole('button', { name: 'Ver demo sin registrarte' }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 40000 });

  const projectLink = page.locator('a[href^="/projects/"]:not([href="/dashboard/create-project"])').first();
  await projectLink.click();
  await expect(page).toHaveURL(/\/projects\/[a-zA-Z0-9]+/);

  await page.getByRole('link', { name: 'Nueva Tarea' }).click();

  const taskName = `Tarea E2E ${Date.now()}`;
  await page.getByLabel('Nombre de la tarea').fill(taskName);
  await page.getByLabel(/descripción/i).fill('Tarea creada automáticamente por Playwright');
  await page.getByRole('button', { name: 'Guardar Tarea' }).click();

  await expect(page.getByText(taskName)).toBeVisible({ timeout: 10000 });
});