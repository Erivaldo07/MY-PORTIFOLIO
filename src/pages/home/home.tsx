import { Mail, Phone} from 'lucide-react'
import Reveal from '@/components/common/Reveal'
import ArchitecturePulse from '@/components/common/ArchitecturePulse'
import { profile } from '@/data/profile'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

function Home() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-10 pt-16">
      <Reveal>
        <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[#D9A85C]">
          // desenvolvedor web full-stack
        </p>
        <h1 className="mb-5 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mb-8 max-w-xl text-base text-muted-foreground sm:text-lg">
          Sou desenvolvedor apaixonado por tecnologia, com foco na inovação e na
          criação de interfaces modernas. Construo produtos reais — do turismo à
          saúde, da educação ao serviço público — sempre à procura da solução
          certa a longo prazo, não da mais rápida.
        </p>

        <div className="mb-12 flex flex-wrap gap-3">
  <a
    href={`mailto:${profile.email}`}
    className="flex items-center gap-2 rounded-full bg-[#2E9CB3] px-4 py-2 text-sm font-semibold text-[#04141C] transition-transform hover:-translate-y-0.5"
  >
    <Mail size={16} />
    Enviar email
  </a>

  <a
    href={profile.phoneHref}
    className="flex items-center gap-2 rounded-full border border-[#1F3B54] px-4 py-2 text-sm transition-colors hover:border-white/40"
  >
    <Phone size={16} />
    {profile.phone}
  </a>

  <a
    href={profile.github}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 rounded-full border border-[#1F3B54] px-4 py-2 text-sm transition-colors hover:border-white/40"
  >
    <FaGithub size={16} />
    GitHub
  </a>

  <a
    href={profile.linkedin}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 rounded-full border border-[#1F3B54] px-4 py-2 text-sm transition-colors hover:border-white/40"
  >
    <FaLinkedin size={16} />
    LinkedIn
  </a>
</div>


      </Reveal>

      <Reveal delay={150}>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="mb-4 font-mono text-xs text-muted-foreground">
            stack em produção — do clique ao dado
          </p>
          <ArchitecturePulse />
        </div>
      </Reveal>
    </section>
  )
}

export default Home
