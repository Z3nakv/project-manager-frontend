/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { httpPost } from "../../lib/http";
import { assignTask } from "../assignTask";

vi.mock("../../lib/http", () => ({
  httpPost: vi.fn(),
}));

describe("assignTask", () => {
  const projectId = "proj-123";
  const taskId = "task-456";
  const userIds = { userIds: ["user-1", "user-2"] };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("llama a httpPost con la URL y payload correctos", async () => {
    const mockResponse = {
      message: "message",
      taskName: "tarea-1",
      projectName: "projecto-1",
      projectId: "abd-123",
      userIds: ["12345"],
    };
    vi.mocked(httpPost).mockResolvedValueOnce(mockResponse);

    await assignTask({ projectId, taskId, userIds });

    expect(httpPost).toHaveBeenCalledWith(
      `/projects/${projectId}/tasks/${taskId}/assign`,
      userIds,
    );
  });

  it("retorna la data parseada cuando la respuesta es válida", async () => {
    const mockResponse = {
      message: "message",
      taskName: "tarea-1",
      projectName: "projecto-1",
      projectId: "abd-123",
      userIds: ["12345"],
    };
    vi.mocked(httpPost).mockResolvedValueOnce(mockResponse);

    const result = await assignTask({ projectId, taskId, userIds });

    expect(result).toEqual(mockResponse);
  });

  it("lanza un error si la respuesta no cumple el schema", async () => {
    const invalidResponse = { assignIds: "not-an-array" };
    vi.mocked(httpPost).mockResolvedValueOnce(invalidResponse);

    await expect(assignTask({ projectId, taskId, userIds })).rejects.toThrow();
  });

  it("propaga el error si httpPost falla", async () => {
    vi.mocked(httpPost).mockRejectedValueOnce(new Error("Network error"));

    await expect(assignTask({ projectId, taskId, userIds })).rejects.toThrow(
      "Network error",
    );
  });
});
