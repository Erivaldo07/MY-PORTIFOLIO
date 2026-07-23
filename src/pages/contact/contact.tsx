import { Phone } from 'lucide-react'
import Reveal from '@/components/common/Reveal'
import { profile } from '@/data/profile'

function Contact() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <p className="mb-3 font-mono text-xs uppercase text-[#2E9CB3]">
          contacto
        </p>

        <h1 className="mb-6 max-w-lg text-2xl font-semibold sm:text-3xl">
          Tens um projeto em mente? Vamos falar.
        </h1>

        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 rounded-full bg-[#2E9CB3] px-5 py-3 text-sm font-semibold text-[#04141C] transition-transform hover:-translate-y-0.5"
          >
            {profile.email}
          </a>

          <a
            href={profile.phoneHref}
            className="flex items-center gap-2 rounded-full border border-[#1F3B54] px-5 py-3 text-sm transition-colors hover:border-white/40"
          >
            <Phone size={15} />
            {profile.phone}
          </a>
        </div>
      </Reveal>
    </section>
  )
}

export default Contact
