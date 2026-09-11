import { test, expect } from "@playwright/test";

test("usuario puede crear una tarea desde una sugerencia de IA", async ({
  page,
}) => {
  test.setTimeout(60000);

  let projectId = "";
  const suggestedTaskName = `Tarea IA E2E ${Date.now()}`;
  const suggestedTaskDescription =
    "Tarea sugerida automáticamente para validar el flujo E2E";

  await page.route("**/api/projects/*/suggest-tasks", async (route) => {
    expect(route.request().method()).toBe("POST");

    const requestBody = route.request().postDataJSON();
    expect(requestBody).toEqual({
      selectedFields: ["labels", "estimatedDays"],
      quantity: 1,
    });

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          name: suggestedTaskName,
          description: suggestedTaskDescription,
          labels: [{ text: "Frontend", color: "sky" }],
          estimatedDays: 3,
        },
      ]),
    });
  });

  await page.route("**/api/projects/*/tasks", async (route) => {
    if (route.request().method() !== "POST") {
      await route.continue();
      return;
    }

    const requestBody = route.request().postDataJSON();
    expect(requestBody).toMatchObject({
      name: suggestedTaskName,
      description: suggestedTaskDescription,
      labels: [{ text: "Frontend", color: "sky" }],
    });
    expect(requestBody.deadline).toBeTruthy();

    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Tarea creada correctamente",
      }),
    });
  });

  await page.goto("/");
  await page.getByRole("button", { name: "Ver demo sin registrarte" }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 40000 });

  const projectLink = page
    .locator('a[href^="/projects/"]:not([href="/dashboard/create-project"])')
    .first();
  await expect(projectLink).toBeVisible();

  const projectHref = await projectLink.getAttribute("href");
  expect(projectHref).toBeTruthy();
  expect(projectHref).toMatch(/^\/projects\/[a-zA-Z0-9]+$/);

  const projectPath = projectHref!;
  projectId = projectPath.split("/")[2]!;
  expect(projectId).toBeTruthy();

  await page.goto(projectPath);
  await expect(page).toHaveURL(new RegExp(`/projects/${projectId}$`));

  await page.getByRole("link", { name: "Crear con IA" }).click();
  await expect(page).toHaveURL(
    new RegExp(`/projects/${projectId}\\?viewTaskProps=true$`),
  );

  await expect(
    page.getByText("Propiedades para nuevas tareas", { exact: true }),
  ).toBeVisible();

  await page.locator('input[name="Labels"]').check();
  await page.locator('input[name="EstimatedDays"]').check();
  await page.getByLabel("¿Cuántas tareas deseas crear?").selectOption("1");
  await page.getByRole("button", { name: "Agregar" }).click();

  await expect(page).toHaveURL(
    new RegExp(`/projects/${projectId}\\?viewSuggestions=true$`),
  );

  await expect(
    page.getByText(suggestedTaskName, { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(suggestedTaskDescription, { exact: true }),
  ).toBeVisible();

  await page.getByRole("checkbox").last().check();

  const createTaskRequest = page.waitForRequest((request) => {
    return (
      request.method() === "POST" &&
      new URL(request.url()).pathname ===
        `/api/projects/${projectId}/tasks`
    );
  });

  await page.getByRole("button", { name: "Crear 1 tareas" }).click();
  await createTaskRequest;

  await expect(page).not.toHaveURL(/viewSuggestions=true/);
});
