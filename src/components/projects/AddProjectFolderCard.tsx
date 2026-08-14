import { Link } from "react-router";
import { FiFolderPlus } from "react-icons/fi";

const AddProjectFolderCard = () => {
  return (
    <div className="relative pt-4">
      {/* Pestaña de la carpeta, punteada */}
      <div className="absolute top-1 left-4 w-16 h-4 bg-bg border border-dashed border-primary/40 border-b-0 rounded-t-md z-10" />

      <Link
        to="/dashboard/create-project"
        className="group flex flex-col items-center justify-center gap-2.5 h-full min-h-45 bg-bg border border-dashed border-primary/40 hover:border-primary/70 hover:bg-primary-subtle rounded-tl-sm rounded-tr-2xl rounded-b-2xl transition-colors duration-150 cursor-pointer list-none"
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-150">
          <FiFolderPlus className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm font-medium text-accent">Nuevo proyecto</p>
      </Link>
    </div>
  );
};

export default AddProjectFolderCard;