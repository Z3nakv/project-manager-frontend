import { test, expect, type Page } from "@playwright/test";

const userA = {
  email: process.env.VITE_TEST_USER_A_EMAIL,
  password: process.env.VITE_TEST_USER_A_PASSWORD,
};

const userB = {
  email: process.env.VITE_TEST_USER_B_EMAIL,
  password: process.env.VITE_TEST_USER_B_PASSWORD,
};

const projectId = process.env.E2E_SHARED_PROJECT_ID;

async function login(page: Page, email?: string, password?: string) {
  if (!email || !password) {
    throw new Error(
      "Faltan TEST_USER_*_EMAIL y TEST_USER_*_PASSWORD para el test E2E",
    );
  }

  await page.goto("/auth/login");

  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  await expect(page).toHaveURL(/\/dashboard/, { timeout: 40000 });
}

test.describe("colaboración en tiempo real", () => {
  test.skip(
    !projectId ||
      !userA.email ||
      !userA.password ||
      !userB.email ||
      !userB.password,
    "Requiere dos usuarios y un proyecto compartido",
  );

  test("un usuario recibe en tiempo real una tarea creada por otro usuario", async ({
    browser,
  }) => {
    test.setTimeout(90000);

    const contextA = await browser.newContext();
    const contextB = await browser.newContext();

    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    try {
      await Promise.all([
        login(pageA, userA.email, userA.password),
        login(pageB, userB.email, userB.password),
      ]);

      await Promise.all([
        pageA.goto(`/projects/${projectId}`),
        pageB.goto(`/projects/${projectId}`),
      ]);

      await Promise.all([
        expect(pageA).toHaveURL(new RegExp(`/projects/${projectId}`)),
        expect(pageB).toHaveURL(new RegExp(`/projects/${projectId}`)),
        expect(pageA.getByRole("link", { name: "Nueva Tarea" })).toBeVisible(),
        expect(pageB.getByRole("link", { name: "Nueva Tarea" })).toBeVisible(),
      ]);

      const taskName = `Tarea realtime ${Date.now()}`;
      const notificationText = `Se ha creado la tarea ${taskName}`;

      await pageA.getByRole("link", { name: "Nueva Tarea" }).click();
      await pageA.getByLabel("Nombre de la tarea").fill(taskName);
      await pageA
        .getByLabel(/descripción/i)
        .fill("Tarea creada para validar Socket.io");

      const createTaskResponse = pageA.waitForResponse((response) => {
        return (
          response.request().method() === "POST" &&
          response.url().includes(`/projects/${projectId}/tasks`) &&
          response.ok()
        );
      });

      await pageA.getByRole("button", { name: "Guardar Tarea" }).click();
      await createTaskResponse;

      await expect(pageA.getByText(taskName, { exact: true })).toBeVisible({
        timeout: 10000,
      });

      await expect(pageB.getByText(notificationText, { exact: true })).toBeVisible(
        { timeout: 15000 },
      );
    } finally {
      await contextA.close();
      await contextB.close();
    }
  });
});