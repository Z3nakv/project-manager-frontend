import { test, expect } from "@playwright/test";

test("usuario puede abrir una notificación y navegar al proyecto relacionado", async ({
  page,
}) => {
  test.setTimeout(60000);

  let projectId = "";
  const notificationId = "e2e-notification-1";
  const notificationContent = "Se ha actualizado una tarea del proyecto";

  await page.route("**/api/notifications", async (route) => {
    const request = route.request();
    const requestUrl = new URL(request.url());

    if (
      request.method() === "GET" &&
      requestUrl.pathname.endsWith("/api/notifications")
    ) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            _id: notificationId,
            content: notificationContent,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            read: false,
            type: "task_status_updated",
            project: projectId ? { _id: projectId } : null,
            task: null,
            triggeredBy: null,
            user: { _id: "e2e-user-1" },
          },
        ]),
      });
      return;
    }

    if (
      request.method() === "DELETE" &&
      requestUrl.pathname.endsWith("/api/notifications")
    ) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Notificaciones eliminadas" }),
      });
      return;
    }

    await route.continue();
  });

  await page.route("**/api/notifications/*/read", async (route) => {
    expect(route.request().method()).toBe("PUT");

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Notificación leída",
      }),
    });
  });

  await page.goto("/");

  await page
    .getByRole("button", { name: "Ver demo sin registrarte" })
    .click();

  await expect(page).toHaveURL(/\/dashboard/, {
    timeout: 40000,
  });

  const projectLink = page
    .locator('a[href^="/projects/"]:not([href="/dashboard/create-project"])')
    .first();

  await expect(projectLink).toBeVisible();

  const projectHref = await projectLink.getAttribute("href");
  expect(projectHref).toBeTruthy();
  expect(projectHref).toMatch(/^\/projects\/[a-zA-Z0-9]+$/);

  const projectPath = projectHref!;
  projectId = projectPath.split("/")[2]!;

  await page.goto(projectPath);
  const notificationsResponse = page.waitForResponse((response) => {
    return (
      response.request().method() === "GET" &&
      new URL(response.url()).pathname.endsWith("/api/notifications") &&
      response.ok()
    );
  });
  await page.reload();
  await notificationsResponse;

  const notificationButton = page.getByRole("button", {
    name: "notifications",
  });

  await expect(notificationButton).toBeVisible();

  await notificationButton.click();

  await expect(
    page.getByRole("heading", { name: "Notificaciones" }),
  ).toBeVisible();

  const notification = page.getByText(
    notificationContent,
    { exact: true },
  );

  await expect(notification).toBeVisible();

  await expect(notificationButton).toContainText("1");

  const markAsReadRequest = page.waitForRequest((request) => {
    return (
      request.method() === "PUT" &&
      request.url().endsWith(`/api/notifications/${notificationId}/read`)
    );
  });

  await notification.click();

  await markAsReadRequest;

  await expect(page).toHaveURL(
    new RegExp(`/projects/${projectId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`),
  );
});