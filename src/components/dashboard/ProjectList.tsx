import { Link } from "react-router"
import ProjectCard from "../projects/ProjectCard"
import PlusIcon from "../PlusIcon"
import type { ProjectItemType } from "../../types/project"
import type { User } from "../../types/user"

type ProjectListProps = {
    projects: ProjectItemType[]
    user: User
}

const ProjectList = ({ projects, user }: ProjectListProps) => {
  return (
    <>
    {projects?.length ? (
        <ul
          className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
        >
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} user={user} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-36 gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#1e2330] border border-[#2d3348] flex items-center justify-center shadow-md">
            <svg
              className="w-7 h-7 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-slate-300 font-semibold">No hay proyectos aún</p>
            <p className="text-sm text-slate-500 mt-1">
              Crea tu primer proyecto para comenzar
            </p>
          </div>
          <Link
            to="/projects/create-project"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150 shadow-md"
          >
            <PlusIcon />
            Crear Proyecto
          </Link>
        </div>
      )}
      </>
  )
}

export default ProjectList