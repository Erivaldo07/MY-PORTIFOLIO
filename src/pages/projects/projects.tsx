import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  ChevronDown,
} from 'lucide-react'
import Reveal from '@/components/common/Reveal'
import ProjectCard from '@/components/common/ProjectCard'
import { useTranslatedProjects } from '@/hooks/useTranslatedProjects'

// ============================================================
// CATEGORIES
// ============================================================
// `id` é estrutural (usado para filtrar/comparar com project.category)
// e nunca muda. O label vem de projectsPage.categories.{key} no
// common.json — por isso cada item carrega também a `key` de tradução.

const categories = [
  { id: 'all', key: 'all', icon: Grid3x3 },
  { id: 'web', key: 'web', icon: Code2 },
  { id: 'mobile', key: 'mobile', icon: Layers },
  { id: 'enterprise', key: 'enterprise', icon: Briefcase },
  { id: 'open-source', key: 'openSource', icon: Star },
]

// ============================================================
// SORT OPTIONS
// ============================================================

const sortOptions = [
  { id: 'newest', key: 'newest' },
  { id: 'oldest', key: 'oldest' },
  { id: 'alphabetical', key: 'alphabetical' },
  { id: 'popular', key: 'popular' },
]

// ============================================================
// TYPES
// ============================================================

type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'popular'
type ViewMode = 'grid' | 'list'

// ============================================================
// DATE HELPER
// ============================================================

const getProjectTimestamp = (date?: string): number => {
  if (!date) return 0
  const timestamp = new Date(date).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

// ============================================================
// PROJECTS PAGE
// ============================================================

function Projetos() {
  const { t } = useTranslation('common')
  const projects = useTranslatedProjects()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // ==========================================================
  // FILTER + SEARCH + SORT
  // ==========================================================

  const filteredProjects = useMemo(() => {
    let filtered = [...projects]

    const term = searchTerm.trim().toLowerCase()

    if (term) {
      filtered = filtered.filter((project) => {
        const title = project.title?.toLowerCase() ?? ''
        const description = project.description?.toLowerCase() ?? ''
        const tag = project.tag?.toLowerCase() ?? ''
        const stack =
          project.stack?.some((technology) =>
            technology.toLowerCase().includes(term)
          ) ?? false

        return (
          title.includes(term) ||
          description.includes(term) ||
          tag.includes(term) ||
          stack
        )
      })
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      )
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort(
          (a, b) => getProjectTimestamp(b.date) - getProjectTimestamp(a.date)
        )
        break

      case 'oldest':
        filtered.sort(
          (a, b) => getProjectTimestamp(a.date) - getProjectTimestamp(b.date)
        )
        break

      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break

      case 'popular':
        filtered.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))
        break

      default:
        break
    }

    return filtered
  }, [projects, searchTerm, selectedCategory, sortBy])

  // ==========================================================
  // STATISTICS
  // ==========================================================

  const stats = useMemo(
    () => ({
      total: projects.length,
      categories: new Set(projects.map((project) => project.category)).size,
      technologies: new Set(projects.flatMap((project) => project.stack ?? []))
        .size,
    }),
    [projects]
  )

  // ==========================================================
  // CLEAR FILTERS
  // ==========================================================

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSortBy('newest')
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <section className="min-h-screen overflow-hidden">
      {/* ====================================================
          HERO
      ==================================================== */}

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-10">
          {/* Badge */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1.5 rounded-full">
                {t('projectsPage.badge')}
              </span>

              <span className="text-xs text-muted-foreground">•</span>

              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Rocket className="w-3 h-3" />
                {t('projectsPage.projectsCount', { count: stats.total })}
              </span>
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={100}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 max-w-4xl">
              {t('projectsPage.titlePrefix')}{' '}
              <span className="gradient-text">
                {t('projectsPage.titleHighlight')}
              </span>
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal delay={200}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              {t('projectsPage.description')}
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={300}>
            <div className="flex flex-wrap gap-4 sm:gap-8">
              {/* Total */}
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-semibold">{stats.total}</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    {t('projectsPage.statProjects')}
                  </span>
                </div>
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Tag className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-semibold">
                    {stats.categories}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    {t('projectsPage.statCategories')}
                  </span>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Layers className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-semibold">
                    {stats.technologies}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    {t('projectsPage.statTechnologies')}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ====================================================
          FILTER BAR
      ==================================================== */}

      <div className="border-y border-border/50 bg-card/30 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />

              <input
                type="text"
                placeholder={t('projectsPage.searchPlaceholder')}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full md:max-w-xs pl-9 pr-9 py-2.5 rounded-lg bg-background border border-border outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label={t('projectsPage.clearFilters')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Desktop categories */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {categories.map((category) => {
                const Icon = category.icon
                const isActive = selectedCategory === category.id
                const label = t(`projectsPage.categories.${category.key}`)

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Mobile filters toggle */}
              <button
                type="button"
                onClick={() => setShowFilters((current) => !current)}
                className="md:hidden flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-muted/30 text-sm hover:bg-muted/50 transition-colors flex-1"
              >
                <Filter className="w-4 h-4" />
                {t('projectsPage.filters')}
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    showFilters ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* View toggle */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/30">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid"
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-background shadow-sm'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  aria-label="List"
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-background shadow-sm'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                aria-label={t('projectsPage.filters')}
                className="px-3 py-2 rounded-lg bg-muted/30 border border-border text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {t(`projectsPage.sort.${option.key}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    const isActive = selectedCategory === category.id
                    const label = t(`projectsPage.categories.${category.key}`)

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(category.id)
                          setShowFilters(false)
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                            : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {label}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count */}
          <div className="flex items-center justify-between gap-4 mt-3">
            <span className="text-xs text-muted-foreground">
              {t('projectsPage.resultsFound', {
                count: filteredProjects.length,
              })}
            </span>

            {filteredProjects.length === 0 && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {t('projectsPage.noneFound')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ====================================================
          PROJECTS
      ==================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`${viewMode}-${selectedCategory}-${searchTerm}-${sortBy}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 50}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
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
            /* Empty state */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="flex justify-center mb-5">
                <div className="p-4 rounded-full bg-muted/30">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {t('projectsPage.emptyTitle')}
              </h3>

              <p className="text-muted-foreground text-sm">
                {t('projectsPage.emptyDescription')}
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 text-primary hover:underline text-sm font-medium"
              >
                {t('projectsPage.clearFilters')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ====================================================
          FINAL CTA
      ==================================================== */}

      <div className="border-t border-border/50 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
          <Reveal>
            <div className="flex justify-center mb-5">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {t('projectsPage.ctaTitle')}
            </h2>

            <p className="text-muted-foreground mb-7 max-w-2xl mx-auto leading-relaxed">
              {t('projectsPage.ctaDescription')}
            </p>

            <Link
              to="/contacto"
              className="group btn-primary inline-flex items-center gap-2"
            >
              {t('projectsPage.ctaButton')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Projetos
