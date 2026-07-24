import { Link } from 'react-router-dom'
import Reveal from '@/components//common/Reveal'
import ProjectCard from '@/components//common/ProjectCard'
import { projects } from '@/data/projects'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Grid3x3,
  List,
  ArrowRight,
  Sparkles,
  Code2,
  Briefcase,
  Layers,
  Rocket,
  Star,

  Tag,
  X,
  ChevronDown
} from 'lucide-react'

// Categorias para filtro
const categories = [
  { id: 'all', label: 'Todos', icon: Grid3x3 },
  { id: 'web', label: 'Web Apps', icon: Code2 },
  { id: 'mobile', label: 'Mobile', icon: Layers },
  { id: 'enterprise', label: 'Enterprise', icon: Briefcase },
  { id: 'open-source', label: 'Open Source', icon: Star },
]

// Ordenações
const sortOptions = [
  { id: 'newest', label: 'Mais Recentes' },
  { id: 'oldest', label: 'Mais Antigos' },
  { id: 'alphabetical', label: 'A-Z' },
  { id: 'popular', label: 'Mais Populares' },
]

function Projetos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  // Filtrar e ordenar projetos
  const filteredProjects = useMemo(() => {
    let filtered = [...projects]

    // Busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.stack.some(s => s.toLowerCase().includes(term)) ||
        p.tag.toLowerCase().includes(term)
      )
    }

    // Categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Ordenação
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'popular':
        filtered.sort((a, b) => (b.stars || 0) - (a.stars || 0))
        break
      default:
        break
    }

    return filtered
  }, [projects, searchTerm, selectedCategory, sortBy])

  // Estatísticas
  const stats = {
    total: projects.length,
    categories: new Set(projects.map(p => p.category)).size,
    technologies: new Set(projects.flatMap(p => p.stack)).size,
  }

  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                Portfólio
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Rocket className="w-3 h-3" />
                {stats.total} projetos
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Onde o código encontra o <span className="gradient-text">utilizador real</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-6">
              Uma coleção de projetos que resolvem problemas reais, desde aplicações web
              escaláveis até soluções inovadoras com inteligência artificial.
            </p>
          </Reveal>

          {/* Stats rápidos */}
          <Reveal delay={300}>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Code2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-semibold">{stats.total}</span>
                  <span className="text-xs text-muted-foreground ml-1">projetos</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Tag className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-semibold">{stats.categories}</span>
                  <span className="text-xs text-muted-foreground ml-1">categorias</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Layers className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-semibold">{stats.technologies}</span>
                  <span className="text-xs text-muted-foreground ml-1">tecnologias</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="border-t border-border/50 bg-card/30 sticky top-16 z-30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Busca */}
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-9 pr-4 py-2 rounded-lg bg-background border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Filtros Desktop */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                    ${selectedCategory === cat.id
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }
                  `}
                >
                  <cat.icon className="w-3 h-3" />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Controles Mobile */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 text-sm hover:bg-muted/50 transition-colors flex-1 justify-center"
              >
                <Filter className="w-4 h-4" />
                Filtros
                <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/30">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-muted/50'}`}
                  aria-label="Visualização em grade"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-muted/50'}`}
                  aria-label="Visualização em lista"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Ordenação */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg bg-muted/30 border border-border text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              >
                {sortOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtros Mobile Expandidos */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id)
                        setShowFilters(false)
                      }}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                        ${selectedCategory === cat.id
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                          : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                        }
                      `}
                    >
                      <cat.icon className="w-3 h-3" />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resultados */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
            </span>
            {filteredProjects.length === 0 && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Nenhum projeto encontrado
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid de Projetos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`
                grid gap-6
                ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
                }
              `}
            >
              {filteredProjects.map((project, i) => (
                <Reveal key={project.slug} delay={i * 50}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    onMouseEnter={() => setHoveredProject(project.slug)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className={viewMode === 'list' ? 'col-span-full' : ''}
                  >
                    <Link to={`/projetos/${project.slug}`} className="block h-full">
                      <ProjectCard
                        icon={project.icon}
                        tag={project.tag}
                        title={project.title}
                        description={project.description}
                        stack={project.stack}
                        image={project.image}
                        githubUrl={project.githubUrl}
                        liveUrl={project.liveUrl}
                        stars={project.stars}
                        forks={project.forks}
                        featured={project.featured}
                      />
                    </Link>
                  </motion.div>
                </Reveal>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-muted/30">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Nenhum projeto encontrado</h3>
              <p className="text-muted-foreground text-sm">
                Tente ajustar seus filtros ou realizar uma nova busca
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="mt-4 text-primary hover:underline text-sm"
              >
                Limpar filtros
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Final */}
      <div className="border-t border-border/50 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
          <Reveal>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Tem um projeto em mente?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Vamos transformar sua ideia em realidade. Entre em contato e vamos construir algo incrível juntos!
            </p>
            <Link to="/contacto" className="btn-primary inline-flex">
              Vamos Conversar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Projetos
