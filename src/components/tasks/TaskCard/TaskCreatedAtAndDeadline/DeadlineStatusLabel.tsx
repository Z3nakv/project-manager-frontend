import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

type DeadlineStatusLabelProps = {
    deadlineStatus : {
    label: string;
    color: string;
    bg: string;
}}

const DeadlineStatusLabel = ({deadlineStatus} : DeadlineStatusLabelProps) => {
  
  if(deadlineStatus) return (
    <span
      className={`relative flex items-center text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-md border 
        ${deadlineStatus.bg} ${deadlineStatus.color}`}
    >
      {deadlineStatus.label === "Vence pronto" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-current" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {deadlineStatus.label === "Vencida" && (
        <ExclamationTriangleIcon className="h-5" />
      )}
      {deadlineStatus.label}
    </span>
  );
};

export default DeadlineStatusLabel;
