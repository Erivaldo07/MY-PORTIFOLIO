import { useParams, Link } from 'react-router-dom'
import { projects } from '@/data/projects'
import Reveal from '@/components//common/Reveal'

function ProjetoDetalhe() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-[#8FA9BC]">Projeto não encontrado.</p>
        <Link to="/projetos" className="text-[#2E9CB3] underline">
          Voltar aos projetos
        </Link>
      </section>
    )
  }

  const Icon = project.icon

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <Link to="/projetos" className="mb-8 inline-block text-sm text-[#8FA9BC] hover:text-white">
          ← Voltar aos projetos
        </Link>

        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#15304A]">
            <Icon size={24} className="text-[#2E9CB3]" strokeWidth={1.6} />
          </div>
          <div>
            <span className="font-mono text-[11px] uppercase text-[#D9A85C]">{project.tag}</span>
            <h1 className="text-2xl font-semibold sm:text-3xl">{project.title}</h1>
          </div>
        </div>

        <p className="mb-6 leading-relaxed text-[#8FA9BC]">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-[#1F3B54] px-3 py-1.5 font-mono text-xs text-[#8FA9BC]"
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export default ProjetoDetalhe
