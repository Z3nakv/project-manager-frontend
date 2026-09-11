import { test, expect } from "@playwright/test";

test("usuario demo puede mover una tarea entre columnas y el cambio persiste", async ({
  page,
}) => {
  test.setTimeout(60000);

  await page.goto("/");
  await page.getByRole("button", { name: "Ver demo sin registrarte" }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 40000 });

  const projectLink = page
    .locator('a[href^="/projects/"]:not([href="/dashboard/create-project"])')
    .first();

  await projectLink.click();
  await expect(page).toHaveURL(/\/projects\/[a-zA-Z0-9]+/);

  const sourceColumn = page.getByTestId("column-pending");
  const targetColumn = page.getByTestId("column-inProgress");
  const taskCard = sourceColumn
    .locator('[data-testid^="task-card-"]')
    .first();

  await expect(sourceColumn).toBeVisible();
  await expect(targetColumn).toBeVisible();
  await expect(taskCard).toBeVisible();

  const taskTestId = await taskCard.getAttribute("data-testid");
  expect(taskTestId).toBeTruthy();
  const projectId = new URL(page.url()).pathname.split("/")[2];
  const taskId = taskTestId!.replace("task-card-", "");

  const sourceBox = await taskCard.boundingBox();
  const targetBox = await targetColumn.boundingBox();

  expect(sourceBox).not.toBeNull();
  expect(targetBox).not.toBeNull();

  const sourceX = sourceBox!.x + sourceBox!.width / 2;
  const sourceY = sourceBox!.y + sourceBox!.height / 2;
  const targetX = targetBox!.x + targetBox!.width / 2;
  const targetY = targetBox!.y + Math.min(targetBox!.height / 2, 120);

  const statusUpdateResponse = page.waitForResponse((response) => {
    return (
      response.request().method() === "POST" &&
      response.url().endsWith(
        `/api/projects/${projectId}/tasks/${taskId}/status`,
      ) &&
      response.ok()
    );
  });

  await page.mouse.move(sourceX, sourceY);
  await page.mouse.down();

  await page.mouse.move(sourceX + 10, sourceY + 5, { steps: 3 });
  await page.mouse.move(sourceX + 40, sourceY + 20, { steps: 5 });
  await page.mouse.move(targetX - 100, targetY, { steps: 10 });
  await page.mouse.move(targetX, targetY, { steps: 10 });

  await page.mouse.up();
  await statusUpdateResponse;

  // :not() en el selector CSS sí evalúa el atributo del propio elemento,
  // a diferencia de .filter({ hasNot }) que busca en descendientes.
  const movedTask = targetColumn.locator(
    `[data-testid="${taskTestId}"]:not([aria-hidden="true"])`
  );

  await expect(movedTask).toBeVisible({ timeout: 10000 });
  await expect(
    sourceColumn.locator(`[data-testid="${taskTestId}"]`)
  ).toHaveCount(0);

  await page.reload();

  const reloadedTargetColumn = page.getByTestId("column-inProgress");
  await expect(reloadedTargetColumn).toBeVisible();

  await expect(
    reloadedTargetColumn.locator(`[data-testid="${taskTestId}"]`)
  ).toBeVisible({ timeout: 10000 });
});