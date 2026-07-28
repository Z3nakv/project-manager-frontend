/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createNote,
  deleteNote,
  updateNoteStatus,
} from "../../../services/NoteService";
import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteStatusMutation,
} from "../useNotesMutation";

vi.mock("../../../services/NoteService", () => ({
  createNote: vi.fn(),
  deleteNote: vi.fn(),
  updateNoteStatus: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
    queryClient,
  };
}

describe("useNoteMutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useCreateNoteMutation", () => {
    it('debe resetear el campo "content" e invalidar task y project al crear la nota', async () => {
      vi.mocked(createNote).mockResolvedValue(
        "Nota Creada Correctamente" as any,
      );
      const mockResetField = vi.fn();
      const { wrapper, queryClient } = createWrapper();
      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(
        () =>
          useCreateNoteMutation({
            resetField: mockResetField,
            projectId: "proj-1",
            taskId: "task-1",
          }),
        { wrapper },
      );

      result.current.mutate({ content: "Nueva nota" } as any);

      await waitFor(() =>
        expect(toast.success).toHaveBeenCalledWith("Nota Creada Correctamente"),
      );
      expect(mockResetField).toHaveBeenCalledWith("content");
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["project", "proj-1"],
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["task", "task-1"],
      });
    });

    it("debe mostrar toast de error y NO resetear el campo si falla", async () => {
      vi.mocked(createNote).mockRejectedValue(
        new Error("El contenido no puede estar vacío"),
      );
      const mockResetField = vi.fn();
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () =>
          useCreateNoteMutation({
            resetField: mockResetField,
            projectId: "proj-1",
            taskId: "task-1",
          }),
        { wrapper },
      );

      result.current.mutate({ content: "" } as any);

      await waitFor(() =>
        expect(toast.error).toHaveBeenCalledWith(
          "El contenido no puede estar vacío",
        ),
      );
      expect(mockResetField).not.toHaveBeenCalled();
    });
  });

  describe("useDeleteNoteMutation", () => {
    const note = { _id: "note-1", content: "Nota a borrar" } as any;

    it("debe eliminar la nota e invalidar task, project y notifications", async () => {
      vi.mocked(deleteNote).mockResolvedValue("Nota Eliminada" as any);
      const { wrapper, queryClient } = createWrapper();
      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(
        () =>
          useDeleteNoteMutation({
            projectId: "proj-1",
            taskId: "task-1",
            note,
          }),
        { wrapper },
      );

      result.current.handleDeleteNote();

      await waitFor(() =>
        expect(toast.success).toHaveBeenCalledWith("Nota Eliminada"),
      );
      expect(deleteNote).toHaveBeenCalledWith(
        { projectId: "proj-1", taskId: "task-1", noteId: "note-1" },
        expect.anything(),
      );
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["task", "task-1"],
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["project", "proj-1"],
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["notifications"],
      });
    });

    it("debe ignorar clicks repetidos mientras la mutación está en curso (guard de doble-submit)", async () => {
      // Promesa que controlamos manualmente para simular una petición "lenta"
      let resolvePromise: (value: unknown) => void;
      vi.mocked(deleteNote).mockReturnValue(
        new Promise((resolve) => {
          resolvePromise = resolve;
        }) as any,
      );

      const { result } = renderHook(
        () =>
          useDeleteNoteMutation({
            projectId: "proj-1",
            taskId: "task-1",
            note,
          }),
        { wrapper: createWrapper().wrapper },
      );

      // Simula 3 clicks rápidos, antes de que la primera petición resuelva
      result.current.handleDeleteNote();
      result.current.handleDeleteNote();
      result.current.handleDeleteNote();

      await waitFor(() => expect(deleteNote).toHaveBeenCalled());
      expect(deleteNote).toHaveBeenCalledTimes(1);

      // Resolvemos la petición pendiente para limpiar el test correctamente
      resolvePromise!("Nota Eliminada");
      await waitFor(() => expect(toast.success).toHaveBeenCalled());
    });

    it("debe permitir un nuevo intento después de que la mutación falle", async () => {
      vi.mocked(deleteNote).mockRejectedValueOnce(
        new Error("Acción no válida"),
      );
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () =>
          useDeleteNoteMutation({
            projectId: "proj-1",
            taskId: "task-1",
            note,
          }),
        { wrapper },
      );

      result.current.handleDeleteNote();
      await waitFor(() =>
        expect(toast.error).toHaveBeenCalledWith("Acción no válida"),
      );

      // El guard se resetea en onError, así que un segundo intento debe poder dispararse
      vi.mocked(deleteNote).mockResolvedValueOnce("Nota Eliminada" as any);
      result.current.handleDeleteNote();

      await waitFor(() =>
        expect(toast.success).toHaveBeenCalledWith("Nota Eliminada"),
      );
      expect(deleteNote).toHaveBeenCalledTimes(2);
    });
  });

  describe("useUpdateNoteStatusMutation", () => {
    const note = { _id: "note-1", completed: false } as any;

    it("debe actualizar el status e invalidar las queries correctas", async () => {
      vi.mocked(updateNoteStatus).mockResolvedValue(
        "Estado de nota actualizado!" as any,
      );
      const { wrapper, queryClient } = createWrapper();
      const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(
        () =>
          useUpdateNoteStatusMutation({
            projectId: "proj-1",
            taskId: "task-1",
            note,
          }),
        { wrapper },
      );

      result.current.handUpdateNoteStatus();

      await waitFor(() =>
        expect(toast.success).toHaveBeenCalledWith(
          "Estado de nota actualizado!",
        ),
      );
      expect(updateNoteStatus).toHaveBeenCalledWith(
        { projectId: "proj-1", taskId: "task-1", noteId: "note-1" },
        expect.anything(), // 👈 fix 1: segundo argumento de contexto de React Query
      );
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["notifications"],
      });
    });

    it("debe ignorar clicks repetidos mientras está pendiente (guard de doble-submit)", async () => {
      let resolvePromise: (value: unknown) => void;
      vi.mocked(updateNoteStatus).mockReturnValue(
        new Promise((resolve) => {
          resolvePromise = resolve;
        }) as any,
      );

      const { result } = renderHook(
        () =>
          useUpdateNoteStatusMutation({
            projectId: "proj-1",
            taskId: "task-1",
            note,
          }),
        { wrapper: createWrapper().wrapper },
      );

      result.current.handUpdateNoteStatus();
      result.current.handUpdateNoteStatus();

      // 👇 fix 2: esperar a que la primera llamada real se registre antes de contar
      await waitFor(() => expect(updateNoteStatus).toHaveBeenCalled());
      expect(updateNoteStatus).toHaveBeenCalledTimes(1);

      resolvePromise!("Estado actualizado");
      await waitFor(() => expect(toast.success).toHaveBeenCalled());
    });
  });
});
