import { useDroppable } from "@dnd-kit/react";

type DropTaskProps = {
  status: string;
};

const DropTask = ({ status }: DropTaskProps) => {
  const { ref, isDropTarget } = useDroppable({ id: status });

  return (
    <div
      ref={ref}
      className={`
        mt-3 rounded-xl border border-dashed p-4 md:grid place-content-center
        text-xs font-semibold uppercase tracking-widest
        transition-colors duration-150
        hidden
        ${isDropTarget
          ? "border-indigo-500/60 bg-indigo-500/10 text-indigo-400"
          : "border-[#2d3348] bg-transparent text-slate-600 hover:border-[#3d4663] hover:text-slate-500"
        }
      `}
    >
      {isDropTarget ? "Suelta aquí" : "Soltar tarea aquí"}
    </div>
  );
};

export default DropTask;