import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, deleteNote } from "../../services/NoteService";
import { toast } from "react-toastify";
import type { UseFormResetField } from "react-hook-form";
import type { Note, NoteFormData } from "../../types";
import { useRef } from "react";

type useCreateNoteMutationProps = {
  resetField: UseFormResetField<NoteFormData>;
  projectID: string;
  taskID: string;
};

export const useCreateNoteMutation = ({
  resetField,
  projectID,
  taskID,
}: useCreateNoteMutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["project", projectID] });
      queryClient.invalidateQueries({ queryKey: ["task", taskID] });
      resetField("content");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

type useDeleteNoteMutationProps = {
  projectID: string;
  taskID: string;
  note: Note;
};

export const useDeleteNoteMutation = ({
  taskID,
  projectID,
  note,
}: useDeleteNoteMutationProps) => {
  const isSubmitting = useRef(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      isSubmitting.current = false;
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskID] });
      queryClient.invalidateQueries({ queryKey: ["project", projectID] });
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
    mutate({ projectID, taskID, noteID: note._id });
  };

  return { isPending, handleDeleteNote };
};
