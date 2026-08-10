
type ProjectDetailsViewHeroProps = {
    projectName: string
    description: string
}

const ProjectDetailsViewHero = ({ projectName, description } : ProjectDetailsViewHeroProps) => {
  return (
    <>
        <div className="flex gap-5 justify-around md:justify-normal">

            <div className="md:flex md:w-full md:justify-around md:items-center">
              <div className="md:flex-col">
                <h1 className="font-display capitalize w-xs md:w-full text-xl md:text-2xl lg:text-3xl truncate font-bold text-slate-100">
                  {projectName}
                </h1>
                <p className="md:block hidden font-sans text-sm text-slate-400 mt-1 leading-relaxed">
                  {description}
                </p>
              </div>

            </div>
          </div>
    </>
  )
}

export default ProjectDetailsViewHero