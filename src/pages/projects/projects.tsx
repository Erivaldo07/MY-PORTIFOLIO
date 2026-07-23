import { Link } from 'react-router-dom'
import Reveal from '@/components//common/Reveal'
import ProjectCard from '@/components//common/ProjectCard'
import { projects } from '@/data/projects'

function Projetos() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <p className="mb-3 font-mono text-xs uppercase text-[#2E9CB3]">projetos</p>
        <h1 className="mb-10 text-2xl font-semibold sm:text-3xl">
          Onde o código encontra o utilizador real
        </h1>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 90}>
            <Link to={`/projetos/${project.slug}`} className="block h-full">
              <ProjectCard
                icon={project.icon}
                tag={project.tag}
                title={project.title}
                description={project.description}
                stack={project.stack}
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Projetos
