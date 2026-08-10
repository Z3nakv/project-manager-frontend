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
        <div className="flex gap-5 justify-around md:justify-normal">
            <ButtonLink to={"/dashboard"} icon={ArrowLeftIcon} classname="">
              Volver
            </ButtonLink>

            <div className="md:flex md:w-full md:justify-around md:items-center">
              <div className="md:flex-col">
                <h1 className="font-display capitalize w-xs md:w-full text-xl md:text-2xl lg:text-3xl truncate font-bold text-slate-100">
                  {projectName}
                </h1>
                <p className="md:block hidden font-sans text-sm text-slate-400 mt-1 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="hidden md:flex justify-center gap-2 mb-8 md:mt-4">
                <Button query="?viewTaskProps=true" icon={HiSparkles}>
                  <span className="hidden lg:block">Crear tareas con IA</span>
                </Button>
                <Button query={"?newTask=true"} icon={PlusIcon}>
                  <span className="hidden lg:block">Agregar Tarea</span>
                </Button>
                <ButtonLink to={"team"} icon={UsersIcon}>
                  <span className="hidden lg:block">Colaboradores</span>
                </ButtonLink>
              </div>
            </div>
          </div>
    </>
  )
}

export default ProjectDetailsViewHero