import { Phone, Mail } from 'lucide-react'
import Reveal from '@/components/common/Reveal'
import { profile } from '@/data/profile'

function Contact() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <p className="mb-3 font-mono text-xs uppercase text-primary">
          contacto
        </p>

        <h1 className="mb-6 max-w-lg text-2xl font-semibold text-foreground sm:text-3xl">
          Tens um projeto em mente? Vamos falar.
        </h1>

        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Mail size={15} />
            {profile.email}
          </a>

          <a
            href={profile.phoneHref}
            className="flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-foreground transition-colors hover:border-primary"
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
