import { useDroppable } from "@dnd-kit/react";

type DropTaskProps = {
  status: string;
  children: React.ReactNode;
};

const DropTask = ({ status, children }: DropTaskProps) => {
  const { ref } = useDroppable({ id: status });

  return (
    <div
      ref={ref}
      data-testid={`column-${status}`}
    >
      {children}
    </div>
  );
};

export default DropTask;