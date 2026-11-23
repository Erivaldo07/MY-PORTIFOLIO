import { useRef, useState, type PointerEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, ExternalLink, Star, GitFork } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type ProjectCardProps = {
  icon: LucideIcon
  tag: string
  title: string
  description: string
  stack: string[]
  image?: string
  githubUrl?: string
  liveUrl?: string
  stars?: number
  forks?: number
  featured?: boolean
}

const MAX_VISIBLE_TECH = 5
const TILT_INTENSITY = 8 // graus máximos de inclinação

function ProjectCard({
  icon: Icon,
  tag,
  title,
  description,
  stack,
  image,
  githubUrl,
  liveUrl,
  stars = 0,
  forks = 0,
  featured = false
}: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const [imageFailed, setImageFailed] = useState(false)

  // Link principal: o card inteiro leva para o projeto online (ou GitHub)
  const primaryUrl = liveUrl ?? githubUrl

  const visibleStack = stack.slice(0, MAX_VISIBLE_TECH)
  const hiddenCount = stack.length - visibleStack.length

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    // Só rato: ignora touch/caneta
    if (e.pointerType !== 'mouse') return
    // Respeita utilizadores que preferem menos animação
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const container = containerRef.current
    const tilt = tiltRef.current
    if (!container || !tilt) return

    const rect = container.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width // 0 → 1
    const py = (e.clientY - rect.top) / rect.height // 0 → 1

    // Escrevemos direto no DOM (sem setState) → zero re-renders
    tilt.style.setProperty('--rx', `${(0.5 - py) * TILT_INTENSITY}deg`)
    tilt.style.setProperty('--ry', `${(px - 0.5) * TILT_INTENSITY}deg`)
    tilt.style.setProperty('--px', `${px * 100}%`)
    tilt.style.setProperty('--py', `${py * 100}%`)
  }

  const handlePointerLeave = () => {
    const tilt = tiltRef.current
    if (!tilt) return
    ;['--rx', '--ry', '--px', '--py'].forEach((v) => tilt.style.removeProperty(v))
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative h-full perspective-[1000px]"
    >
      <div
        ref={tiltRef}
        className="relative h-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))'
        }}
      >
        {/* Glow de fundo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-linear-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Badge de destaque */}
        {featured && (
          <div className="absolute -top-2 -right-2 z-20">
            <div className="flex items-center gap-1 rounded-full bg-linear-to-r from-primary to-primary/80 px-2.5 py-1 text-[10px] font-medium text-primary-foreground shadow-lg shadow-primary/30">
              <Star className="h-3 w-3 fill-current" />
              Destaque
            </div>
          </div>
        )}

        <Card
          className={`relative flex h-full flex-col overflow-hidden border-border bg-card/80 shadow-lg backdrop-blur-sm transition-shadow duration-500 group-hover:shadow-2xl ${
            featured ? 'ring-1 ring-primary/30' : ''
          }`}
        >
          {/* Spotlight que segue o cursor */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(350px circle at var(--px, 50%) var(--py, 50%), color-mix(in oklab, var(--color-primary) 12%, transparent), transparent 70%)'
            }}
          />

          {/* Imagem do projeto */}
          {image && !imageFailed && (
            <div className="relative h-48 shrink-0 overflow-hidden">
              <img
                src={image}
                alt={`Pré-visualização do projeto ${title}`}
                loading="lazy"
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-card to-transparent" />
            </div>
          )}

          <CardHeader
            className={`relative z-10 flex flex-row items-start justify-between ${
              image && !imageFailed ? 'pt-4' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/20 to-primary/5 blur-md transition-all duration-300 group-hover:blur-xl" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-linear-to-br from-primary/20 to-primary/5 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/30">
                  <Icon size={20} strokeWidth={1.6} className="text-primary" />
                </div>
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary/80">
                {tag}
              </span>
            </div>

            {primaryUrl && (
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 text-muted-foreground opacity-60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100 md:opacity-0"
              />
            )}
          </CardHeader>

          <CardContent className="relative z-10 flex flex-1 flex-col">
            <CardTitle className="mb-2 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
              {primaryUrl ? (
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  // after:absolute after:inset-0 → torna o card inteiro clicável
                  className="rounded-sm outline-none after:absolute after:inset-0 after:z-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  {title}
                </a>
              ) : (
                title
              )}
            </CardTitle>

            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
              {description}
            </p>

            {/* Stack de tecnologias */}
            <div className="mb-4 flex flex-wrap gap-1.5">
              {visibleStack.map((tech) => (
                <span
                  key={tech}
                  className="cursor-default rounded-full border border-border/50 bg-muted/30 px-3 py-1 font-mono text-[10px] text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                >
                  {tech}
                </span>
              ))}
              {hiddenCount > 0 && (
                <span
                  title={stack.slice(MAX_VISIBLE_TECH).join(', ')}
                  className="cursor-default rounded-full border border-dashed border-border/50 px-3 py-1 font-mono text-[10px] text-muted-foreground"
                >
                  +{hiddenCount}
                </span>
              )}
            </div>

            {/* Métricas e ações (mt-auto → sempre no fundo do card) */}
            <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
              <div className="flex items-center gap-4 text-muted-foreground">
                {stars > 0 && (
                  <div className="flex items-center gap-1" title={`${stars} estrelas`}>
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-xs font-medium">{stars}</span>
                  </div>
                )}
                {forks > 0 && (
                  <div className="flex items-center gap-1" title={`${forks} forks`}>
                    <GitFork className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">{forks}</span>
                  </div>
                )}
              </div>

              {/* relative z-10 → ficam acima do link esticado do título */}
              <div className="relative z-10 flex items-center gap-2">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver código de ${title} no GitHub`}
                    className="group/btn rounded-lg p-1.5 text-muted-foreground outline-none transition-all duration-300 hover:bg-primary/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <FaGithub className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                  </a>
                )}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ${title} online`}
                    className="group/btn rounded-lg p-1.5 text-muted-foreground outline-none transition-all duration-300 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjectCard
