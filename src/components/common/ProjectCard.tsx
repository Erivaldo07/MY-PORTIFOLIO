import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { LucideIcon } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { ArrowUpRight, ExternalLink, Star, GitFork } from 'lucide-react'
import {FaGithub} from 'react-icons/fa'

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
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
      setMousePosition({ x, y })
    }

    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove)
    } else {
      setMousePosition({ x: 0, y: 0 })
    }

    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  return (
    <div className="group relative h-full">
      {/* Efeito de glow de fundo */}
      <div
        className="absolute -inset-0.5 bg-linear-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
      />

      {/* Badge de featured */}
      {featured && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="flex items-center gap-1 px-2.5 py-1 bg-linear-to-r from-primary to-primary/80 rounded-full text-[10px] font-medium text-primary-foreground shadow-lg shadow-primary/30">
            <Star className="w-3 h-3 fill-current" />
            Destaque
          </div>
        </div>
      )}

      <Card
        ref={cardRef}
        className="relative h-full border-border bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-500 hover:shadow-2xl overflow-hidden"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.02)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradiente de overlay no hover */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Imagem do projeto (se fornecida) */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-card to-transparent" />
          </div>
        )}

        <CardHeader className={`flex flex-row items-start justify-between ${image ? 'pt-4' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-primary/5 rounded-xl blur-md group-hover:blur-xl transition-all duration-300" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/10 group-hover:border-primary/30 transition-all duration-300 group-hover:scale-110">
                <Icon size={20} className="text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.6} />
              </div>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            </div>
          </div>

          {/* Indicador de interação */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>

        <CardContent>
          <CardTitle className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>

          <p className="mb-4 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
            {description}
          </p>

          {/* Stack de tecnologias */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {stack.map((s) => (
              <span
                key={s}
                className="relative group/tech rounded-full border border-border/50 px-3 py-1 font-mono text-[10px] text-muted-foreground bg-muted/30 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 cursor-default"
              >
                {s}
                <span className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300" />
              </span>
            ))}
          </div>

          {/* Métricas e ações */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-4">
              {stars > 0 && (
                <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-medium">{stars}</span>
                </div>
              )}
              {forks > 0 && (
                <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                  <GitFork className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{forks}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300 group/btn"
                >
                  <FaGithub className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group/btn"
                >
                  <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectCard
