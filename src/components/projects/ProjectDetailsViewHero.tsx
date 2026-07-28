import { ArrowLeftIcon, UsersIcon } from "@heroicons/react/20/solid"
import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"
import { HiSparkles } from "react-icons/hi2"
import PlusIcon from "../PlusIcon"

type ProjectDetailsViewHeroProps = {
    projectName: string
    description: string
}

const ProjectDetailsViewHero = ({ projectName, description } : ProjectDetailsViewHeroProps) => {
  return (
    <>
        <div className="flex justify-between md:justify-normal md:gap-5">
            <ButtonLink to={"/dashboard"} icon={ArrowLeftIcon}>
              Volver
            </ButtonLink>

            <div className="md:flex md:w-full md:items-center md:justify-around">
              <div className="mb-5">
                <h1 className="text-3xl font-bold text-slate-100 wrap-break-word">
                  {projectName}
                </h1>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="flex md:flex-col lg:flex-row justify-center gap-2 mb-8 md:mt-4">
                <Button query="?viewTaskProps=true" icon={HiSparkles}>
                  <span className="hidden md:block">Sugerir tareas con IA</span>
                </Button>
                <Button query={"?newTask=true"} icon={PlusIcon}>
                  <span className="hidden md:block">Agregar Tarea</span>
                </Button>
                <ButtonLink to={"team"} icon={UsersIcon}>
                  <span className="hidden md:block">Colaboradores</span>
                </ButtonLink>
              </div>
            </div>
          </div>
    </>
  )
}

export default ProjectDetailsViewHero