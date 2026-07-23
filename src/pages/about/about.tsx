import Reveal from '@/components/common/Reveal'
import { skillGroups } from '@/data/skills'

function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <p className="mb-3 font-mono text-xs uppercase text-[#2E9CB3]">sobre</p>
        <h1 className="mb-6 text-2xl font-semibold sm:text-3xl">
          1 ano de estrada, quatro setores diferentes
        </h1>
        <p className="max-w-2xl leading-relaxed text-[#8FA9BC]">
          Há cerca de um ano dedico-me ao desenvolvimento web full-stack em
          Angola. Nesse tempo, em vez de ficar num único domínio, escolhi
          construir para contextos bem diferentes entre si: um sistema de
          gestão educacional para municípios, uma plataforma de turismo com
          IA e mapas, um serviço de consulta hospitalar e uma plataforma
          governamental de admissão ao ensino técnico-profissional. Gosto de
          entender o problema real antes de escrever código — e de deixar a
          solução pronta para crescer, não apenas para funcionar hoje.
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-14">
        <p className="mb-3 font-mono text-xs uppercase text-[#2E9CB3]">skills técnicas</p>
        <h2 className="mb-8 text-xl font-semibold sm:text-2xl">Ferramentas do dia-a-dia</h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-[#1F3B54] bg-[#112436] p-5">
              <group.icon size={18} className="mb-3 text-[#D9A85C]" strokeWidth={1.6} />
              <h3 className="mb-3 text-sm font-semibold">{group.title}</h3>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-[#8FA9BC]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export default About
