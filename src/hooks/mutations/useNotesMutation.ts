import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, deleteNote, updateNoteStatus } from "../../services/NoteService";
import { toast } from "react-toastify";
import type { UseFormResetField } from "react-hook-form";
import { useRef } from "react";
import type { Note, NoteFormData } from "../../types/note";

type useCreateNoteMutationProps = {
  resetField: UseFormResetField<NoteFormData>;
  projectId: string;
  taskId: string;
};

export const useCreateNoteMutation = ({
  resetField,
  projectId,
  taskId,
}: useCreateNoteMutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      resetField("content");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

type useDeleteNoteMutationProps = {
  projectId: string;
  taskId: string;
  note: Note;
};

export const useDeleteNoteMutation = ({
  taskId,
  projectId,
  note,
}: useDeleteNoteMutationProps) => {
  const isSubmitting = useRef(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      isSubmitting.current = false;
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      isSubmitting.current = false;
      toast.error(error.message);
    },
  });

  const handleDeleteNote = () => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    mutate({ projectId, taskId, noteId: note._id });
  };

  return { isPending, handleDeleteNote };
};

type useUpdateNoteStatusMutationProps = {
  projectId: string;
  taskId: string;
  note: Note;
};

export const useUpdateNoteStatusMutation = ({
  taskId,
  projectId,
  note,
}: useUpdateNoteStatusMutationProps) => {
  const isSubmitting = useRef(false);
  const queryClient = useQueryClient();

  const { mutate: updateNoteStatusMutation, isPending } = useMutation({
    mutationFn: updateNoteStatus,
    onSuccess: (data) => {
      isSubmitting.current = false;
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      isSubmitting.current = false;
      toast.error(error.message);
    },
  });

  const handUpdateNoteStatus = () => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    updateNoteStatusMutation({ projectId, taskId, noteId: note._id });
  };

  return { isPending, handUpdateNoteStatus };
};
