
type ProjectDetailsViewHeroProps = {
    projectName: string
    description: string
}

const ProjectDetailsViewHero = ({ projectName, description } : ProjectDetailsViewHeroProps) => {
  return (
    <>
        <div className="flex gap-5 px-10 justify-around md:justify-normal">

            <div className="md:flex md:w-full md:justify-around md:items-center">
              <div className="md:flex-col">
                <h1 className="font-mono capitalize w-xs md:w-full text-xl md:text-2xl lg:text-3xl truncate font-bold text-text-primary">
                  {projectName}
                </h1>
                <p className="md:block hidden font-mono text-sm text-text-secondary mt-1 leading-relaxed">
                  {description}
                </p>
              </div>

            </div>
          </div>
    </>
  )
}

export default ProjectDetailsViewHero