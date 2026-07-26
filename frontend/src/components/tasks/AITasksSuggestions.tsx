import { Fragment, useState } from "react";
import { useTaskSuggestions } from "../../hooks/queries/useTaskSuggestions";
import { useCreateTaskMutation } from "../../hooks/mutations/useTaskMutations";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import { QueryStateWrapper } from "../ui/QueryStateWrapper";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useSearchParams } from "react-router";

type AITaskSuggestionsProps = {
  projectId: string;
  selectedFields: string[];
  quantity: number;
};

export function AITaskSuggestions({
  projectId,
  selectedFields,
  quantity,
}: AITaskSuggestionsProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [searchParams, setSearchParams] = useSearchParams();
  const viewSuggestions = searchParams.get("viewSuggestions");
  const isOpen = viewSuggestions === "true";

  const suggestionsQuery = useTaskSuggestions(projectId, selectedFields, quantity, isOpen);

  const { mutate: createTaskMutation, isPending: createTaskMutationIsPending } = useCreateTaskMutation({ projectId });

  const handleClose = () => {
    setSearchParams((prev) => {
      prev.delete("viewSuggestions");
      return prev;
    });
    setSelected(new Set());
  };

  const toggleSelected = (index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleCreateSelected = async () => {
    const tasksToCreate =
      suggestionsQuery.data?.filter((_, i) => selected.has(i)) ?? [];

    for (const task of tasksToCreate) {
      let deadline: Date | null = null;
      if (task.estimatedDays != null) {
        deadline = new Date();
        deadline.setDate(deadline.getDate() + Math.max(task.estimatedDays, 2));
      }
      createTaskMutation({
        projectId,
        formData: {
          name: task.name,
          description: task.description,
          labels: task.labels,
          deadline: deadline?.toString(),
        },
      });
    }
    toast.success(`${tasksToCreate.length} tareas creadas`);
    handleClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg bg-[#1e2330] border border-[#2d3348] rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-8">
                <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                  <QueryStateWrapper
                    isLoading={suggestionsQuery.isLoading}
                    isError={suggestionsQuery.isError}
                    error={suggestionsQuery.error}
                    onRetry={() => suggestionsQuery.refetch()}
                    skeleton={<SuggestionsSkeleton />}
                  >
                    <ul className="space-y-2">
                      {suggestionsQuery.data?.map((task, i) => (
                        <li
                          key={i}
                          className="flex gap-2 rounded-md border border-slate-800 bg-slate-800/40 p-2.5"
                        >
                          <input
                            type="checkbox"
                            checked={selected.has(i)}
                            onChange={() => toggleSelected(i)}
                            className="mt-1"
                          />
                          <div className="text-slate-400">
                            <p className="text-sm font-medium text-slate-200">
                              {task.name}
                            </p>
                            <p className="text-xs ">{task.description}</p>
                            {task.labels &&
                              task.labels.map((label) => (
                                <div key={label.text} className="flex">
                                  <p>Labels: </p>
                                  {"{"}
                                  <p>{label.text}</p>
                                  {":"}
                                  <p>{label.color}</p>
                                  {"}"}
                                </div>
                              ))}
                            {task.estimatedDays && (
                              <div className="flex">
                                <p>Deadline:</p>
                                <p>{task.estimatedDays}</p>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        onClick={handleClose}
                        className="text-xs text-slate-400 hover:text-slate-300"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleCreateSelected}
                        disabled={
                          selected.size === 0 || createTaskMutationIsPending
                        }
                        className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-40"
                      >
                        {createTaskMutationIsPending && (
                          <FiLoader className="h-3.5 w-3.5 animate-spin" />
                        )}
                        Crear{" "}
                        {selected.size > 0 ? `${selected.size} tareas` : ""}
                      </button>
                    </div>
                  </QueryStateWrapper>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function SuggestionsSkeleton() {
  return (
    <div className="space-y-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-14 rounded-md bg-slate-800/60 animate-pulse"
        />
      ))}
    </div>
  );
}
