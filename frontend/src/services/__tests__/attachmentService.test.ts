/* eslint-disable @typescript-eslint/no-explicit-any */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { getTaskAttachments } from "../AttachmentService";
import { httpGet } from "../../lib/http";

vi.mock("../../lib/http", () => ({
  httpGet: vi.fn(),
}));

const mockedHttpGet = vi.mocked(httpGet);

describe("getTaskAttachments", () => {
    beforeEach(() => {
    vi.clearAllMocks();
  });
  it("devuelve los adjuntos cuando la respuesta es válida", async () => {
    const mockAttachments = [{
      _id: "attach-1",
      filename: "filename.jpg",
      url: "url.com",
      publicId: "id-123",
      mimeType: "image",
      size: "123",
      task: "task-id-123",
      uploadedBy: "user-1",
      createdAt: "10-12-13",
    }];
    mockedHttpGet.mockResolvedValue(mockAttachments);

    const result = await getTaskAttachments({
      projectId: "1",
      taskId: "2",
    });

    expect(mockedHttpGet).toHaveBeenCalledWith("/projects/1/tasks/2/images");

    expect(result).toEqual(mockAttachments);
  });

  it("lanza un error cuando la respuesta no cumple el schema", async () => {
    mockedHttpGet.mockResolvedValue({});

    await expect(
      getTaskAttachments({
        projectId: "1",
        taskId: "2",
      }),
    ).rejects.toThrow(
      'Los datos de "getTaskAttachments" no tienen el formato esperado.',
    );
  });
});
