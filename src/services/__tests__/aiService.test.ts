import { describe, it, expect, vi, beforeEach } from "vitest";
import { httpPost } from "../../lib/http";
import { getTaskSuggestions } from "../aiService";

vi.mock("../../lib/http", () => ({
  httpPost: vi.fn(),
}));

describe("getTaskSuggestions", () => {
  const projectId = "proj-123";
  const selectedFields = ["name", "description"];
  const quantity = 3;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("llama a httpPost con la URL y payload correctos", async () => {
    const mockResponse = [
        { name: "Tarea sugerida 1", description: "Descripción 1" },
      ];
    
    vi.mocked(httpPost).mockResolvedValueOnce(mockResponse);

    await getTaskSuggestions(projectId, selectedFields, quantity);

    expect(httpPost).toHaveBeenCalledWith(
      `/projects/${projectId}/suggest-tasks`,
      { selectedFields, quantity }
    );
  });

  it("retorna la data parseada cuando la respuesta es válida", async () => {
    const mockResponse = [
        { name: "Tarea sugerida 1", description: "Descripción 1" },
      ]

    vi.mocked(httpPost).mockResolvedValueOnce(mockResponse);

    const result = await getTaskSuggestions(projectId, selectedFields, quantity);

    expect(result).toEqual(mockResponse);
  });

  it("lanza un error si la respuesta no cumple el schema", async () => {
    const invalidResponse = { suggestions: "not-an-array" };
    vi.mocked(httpPost).mockResolvedValueOnce(invalidResponse);

    await expect(
      getTaskSuggestions(projectId, selectedFields, quantity)
    ).rejects.toThrow();
  });

  it("propaga el error si httpPost falla", async () => {
    vi.mocked(httpPost).mockRejectedValueOnce(new Error("Network error"));

    await expect(
      getTaskSuggestions(projectId, selectedFields, quantity)
    ).rejects.toThrow("Network error");
  });
});