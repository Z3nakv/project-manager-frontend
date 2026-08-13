import { Link } from "react-router";
import { FiFolderPlus } from "react-icons/fi";

const AddProjectFolderCard = () => {
  return (
    <div className="relative pt-4">
      {/* Pestaña de la carpeta, punteada */}
      <div className="absolute top-1 left-4 w-16 h-4 bg-[#0f1117] border border-dashed border-indigo-500/40 border-b-0 rounded-t-md z-10" />

      <Link
        to="/dashboard/create-project"
        className="group flex flex-col items-center justify-center gap-2.5 h-full min-h-45 bg-[#0f1117] border border-dashed border-indigo-500/40 hover:border-indigo-500/70 hover:bg-indigo-500/5 rounded-tl-sm rounded-tr-2xl rounded-b-2xl transition-colors duration-150 cursor-pointer list-none"
      >
        <div className="w-10 h-10 rounded-full bg-indigo-500/10 group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors duration-150">
          <FiFolderPlus className="w-5 h-5 text-indigo-400" />
        </div>
        <p className="text-sm font-medium text-indigo-400">Nuevo proyecto</p>
      </Link>
    </div>
  );
};

export default AddProjectFolderCard;