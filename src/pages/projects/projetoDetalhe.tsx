import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  Star,
  GitFork,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Code2,
  Layers,
  Rocket,
  Share2,
  Bookmark,
  BookmarkCheck,
  Eye,
  MessageCircle,
  Grid3x3,
} from 'lucide-react'
import Reveal from '@/components/common/Reveal'
import { projects } from '@/data/projects'
import { getProjectImageUrl } from '@/utils/projectImage'
import { useTranslatedProject } from '@/hooks/useTranslatedProjects'

const FALLBACK_IMAGE = '/images/projects/placeholder.jpg'

function ProjetoDetalhe() {
  const { slug } = useParams()
  const { t } = useTranslation('common')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Índices de navegação vêm dos dados-base (ordem não muda com idioma)
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  // Projeto atual, já com title/tag/description traduzidos
  const { project } = useTranslatedProject(slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-muted/30">
              <Code2 className="w-12 h-12 text-muted-foreground" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {t('projectDetail.notFoundTitle')}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('projectDetail.notFoundDescription')}
          </p>
          <Link to="/projetos" className="btn-primary inline-flex">
            <ArrowLeft className="w-4 h-4" />
            {t('projectDetail.back')}
          </Link>
        </div>
      </section>
    )
  }

  const Icon = project.icon

  // --------------------------------------------------------
  // IMAGEM DO PROJETO
  // --------------------------------------------------------
  const autoImage = getProjectImageUrl(project)
  const projectImages = autoImage ? [autoImage] : [FALLBACK_IMAGE]

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    if (event.currentTarget.src.endsWith(FALLBACK_IMAGE)) return
    event.currentTarget.src = FALLBACK_IMAGE
  }

  return (
    <section className="min-h-screen">
      {/* Navegação Superior */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            to="/projetos"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            {t('projectDetail.back')}
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
              aria-label={t('projectDetail.bookmarkLabel')}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-primary" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() =>
                navigator.share?.({
                  title: project.title,
                  url: window.location.href,
                })
              }
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
              aria-label={t('projectDetail.shareLabel')}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero do Projeto */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                <Icon size={32} className="text-primary" strokeWidth={1.6} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
                    {project.tag}
                  </span>
                  {project.featured && (
                    <span className="text-xs flex items-center gap-1 text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      {t('projectDetail.featured')}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  {project.title}
                </h1>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed mb-6">
              {project.description}
            </p>
          </Reveal>

          {/* Métricas Rápidas */}
          <Reveal delay={150}>
            <div className="flex flex-wrap gap-6 mb-6">
              {project.stars !== undefined && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>
                    {project.stars} {t('projectDetail.stars')}
                  </span>
                </div>
              )}

              {project.forks !== undefined && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GitFork className="w-4 h-4" />
                  <span>
                    {project.forks} {t('projectDetail.forks')}
                  </span>
                </div>
              )}

              {project.views !== undefined && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  <span>
                    {project.views} {t('projectDetail.views')}
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          {/* Ações */}
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink size={18} />
                  {t('projectDetail.viewProject')}
                  <Rocket className="w-4 h-4" />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Galeria de Imagens */}
      {projectImages.length > 0 && (
        <div className="border-t border-border/50 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <Reveal>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                {t('projectDetail.gallery')}
              </h2>
            </Reveal>

            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl bg-muted/30 aspect-video">
                <img
                  src={projectImages[currentImage]}
                  alt={`${project.title} - ${currentImage + 1}`}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-pointer"
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImage((prev) =>
                          prev > 0 ? prev - 1 : projectImages.length - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImage((prev) =>
                          prev < projectImages.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {projectImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {projectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImage === index
                            ? 'bg-white w-6'
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Reveal>
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  {t('projectDetail.stack')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-sm font-medium hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Reveal>
              <div className="p-6 rounded-xl bg-card/30 border border-border/50">
                <h3 className="font-semibold mb-4">{t('projectDetail.infoTitle')}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t('projectDetail.infoStatus')}
                    </p>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      {t('projectDetail.infoStatusValue')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t('projectDetail.infoClient')}
                    </p>
                    <p className="text-sm font-medium">
                      {t('projectDetail.infoClientValue')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t('projectDetail.infoType')}
                    </p>
                    <p className="text-sm font-medium capitalize">{project.tag}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t('projectDetail.infoCategory')}
                    </p>
                    <p className="text-sm font-medium capitalize">
                      {project.category || 'Web'}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="p-6 rounded-xl bg-card/30 border border-border/50">
                <h3 className="font-semibold mb-4">{t('projectDetail.keyTech')}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-primary/5 border border-primary/10 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="p-6 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2">{t('projectDetail.ctaTitle')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('projectDetail.ctaDescription')}
                </p>
                <Link to="/contacto" className="btn-primary w-full justify-center text-sm">
                  <MessageCircle className="w-4 h-4" />
                  {t('projectDetail.ctaButton')}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Navegação entre Projetos */}
      {(prevProject || nextProject) && (
        <div className="border-t border-border/50 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex justify-between items-center gap-4">
              {prevProject ? (
                <Link
                  to={`/projetos/${prevProject.slug}`}
                  className="group flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t('projectDetail.prevProject')}
                    </p>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      {prevProject.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              <Link
                to="/projetos"
                className="p-2 rounded-lg hover:bg-muted/30 transition-colors text-muted-foreground hover:text-foreground"
              >
                <Grid3x3 className="w-5 h-5" />
              </Link>

              {nextProject ? (
                <Link
                  to={`/projetos/${nextProject.slug}`}
                  className="group flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-all duration-300 text-right"
                >
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t('projectDetail.nextProject')}
                    </p>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      {nextProject.title}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProjetoDetalhe
