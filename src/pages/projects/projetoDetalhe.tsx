import { useParams, Link, useNavigate } from 'react-router-dom'
import { projects } from '@/data/projects'
import Reveal from '@/components//common/Reveal'
import {
  ArrowLeft,
  Calendar,
  Star,
  GitFork,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Target,
  Code2,
  Layers,
  Zap,
  Shield,
  Rocket,
  Share2,
  Bookmark,
  BookmarkCheck,
  Eye,
  Heart,
  MessageCircle,
  Grid3x3
} from 'lucide-react'
import { useState, useEffect } from 'react'

// Dados de exemplo para demonstração - você pode adicionar no data/projects.ts
const projectFeatures = {
  'plataforma-turismo': {
    overview: 'Uma plataforma inteligente que utiliza IA para recomendações personalizadas de viagens, integrando mapas interativos e dados em tempo real.',
    challenges: ['Integração de múltiplas APIs de turismo', 'Sistema de recomendação com IA', 'Performance com dados geoespaciais'],
    solutions: ['API Gateway para integrações', 'Modelo de IA treinado com dados reais', 'Cache e otimização de consultas'],
    results: ['Aumento de 40% na retenção de usuários', 'Redução de 60% no tempo de busca', '5 mil usuários ativos'],
    features: [
      'Recomendações personalizadas com IA',
      'Mapas interativos com pontos turísticos',
      'Sistema de avaliações e comentários',
      'Dashboard para gestores de turismo'
    ]
  }
}

function ProjetoDetalhe() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(42)
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Encontrar projeto atual e índices de navegação
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[currentIndex]
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  // Efeito de scroll ao topo
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
          <h2 className="text-2xl font-bold mb-2">Projeto não encontrado</h2>
          <p className="text-muted-foreground mb-6">O projeto que você procura não existe ou foi removido.</p>
          <Link to="/projetos" className="btn-primary inline-flex">
            <ArrowLeft className="w-4 h-4" />
            Voltar aos projetos
          </Link>
        </div>
      </section>
    )
  }

  const Icon = project.icon
  const projectData = projectFeatures[project.slug as keyof typeof projectFeatures] || {
    overview: project.description,
    challenges: ['Desafio 1', 'Desafio 2', 'Desafio 3'],
    solutions: ['Solução 1', 'Solução 2', 'Solução 3'],
    results: ['Resultado 1', 'Resultado 2', 'Resultado 3'],
    features: ['Funcionalidade 1', 'Funcionalidade 2', 'Funcionalidade 3']
  }

  // Imagens de exemplo (substitua pelas imagens reais)
  const projectImages = project.image ? [project.image] : [
    '/images/projects/placeholder-1.jpg',
    '/images/projects/placeholder-2.jpg',
    '/images/projects/placeholder-3.jpg',
  ]

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
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
            Voltar aos projetos
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Favoritar"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-primary" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => navigator.share?.({ title: project.title, url: window.location.href })}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero do Projeto */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
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
                      Destaque
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
              {projectData.overview}
            </p>
          </Reveal>

          {/* Métricas Rápidas */}
          <Reveal delay={150}>
            <div className="flex flex-wrap gap-6 mb-6">
              {project.stars && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{project.stars} stars</span>
                </div>
              )}
              {project.forks && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GitFork className="w-4 h-4" />
                  <span>{project.forks} forks</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Lançado em {new Date(project.date || '2024-01-01').toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>{Math.floor(Math.random() * 500 + 100)} visualizações</span>
              </div>
            </div>
          </Reveal>

          {/* Ações */}
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Github size={18} />
                  Ver Código
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink size={18} />
                  Ver Demonstração
                  <Rocket className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:bg-primary/5"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                <span className="text-sm">{likes}</span>
              </button>
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
                Galeria do Projeto
              </h2>
            </Reveal>

            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl bg-muted/30 aspect-video">
                <img
                  src={projectImages[currentImage] || '/images/projects/placeholder.jpg'}
                  alt={`${project.title} - Imagem ${currentImage + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-pointer"
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                {/* Controles da Galeria */}
                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : projectImages.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev < projectImages.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Indicadores */}
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
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stack Tecnológica */}
            <Reveal>
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Stack Tecnológica
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

            {/* Funcionalidades */}
            <Reveal delay={100}>
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Funcionalidades Principais
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {projectData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-card/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
                    >
                      <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Desafios e Soluções */}
            <Reveal delay={150}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-card/30 border border-border/50">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Desafios
                  </h3>
                  <ul className="space-y-2">
                    {projectData.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">•</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-card/30 border border-border/50">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Soluções
                  </h3>
                  <ul className="space-y-2">
                    {projectData.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">•</span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Resultados */}
            <Reveal delay={200}>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                  <Rocket className="w-5 h-5 text-primary" />
                  Resultados e Impacto
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {projectData.results.map((result, index) => (
                    <div key={index} className="text-center p-3 rounded-lg bg-background/50">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {index === 0 ? '40%' : index === 1 ? '60%' : '5k+'}
                      </div>
                      <p className="text-xs text-muted-foreground">{result}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info do Projeto */}
            <Reveal>
              <div className="p-6 rounded-xl bg-card/30 border border-border/50">
                <h3 className="font-semibold mb-4">Informações do Projeto</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Produção
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Cliente</p>
                    <p className="text-sm font-medium">Setor Público / Privado</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tipo</p>
                    <p className="text-sm font-medium capitalize">{project.tag}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Categoria</p>
                    <p className="text-sm font-medium capitalize">{project.category || 'Web'}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Tecnologias em Destaque */}
            <Reveal delay={100}>
              <div className="p-6 rounded-xl bg-card/30 border border-border/50">
                <h3 className="font-semibold mb-4">Tecnologias Chave</h3>
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

            {/* CTA */}
            <Reveal delay={150}>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2">Gostou do projeto?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Entre em contato para saber como posso ajudar no seu próximo projeto.
                </p>
                <Link to="/contacto" className="btn-primary w-full justify-center text-sm">
                  <MessageCircle className="w-4 h-4" />
                  Vamos Conversar
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
                    <p className="text-xs text-muted-foreground">Projeto Anterior</p>
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
                    <p className="text-xs text-muted-foreground">Próximo Projeto</p>
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
