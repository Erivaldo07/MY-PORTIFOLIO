import { GraduationCap, Compass, Landmark, type LucideIcon } from 'lucide-react'

export type Project = {
  slug: string
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
  date?: string
  category?: string
}

export const projects: Project[] = [
  {
    slug: 'sipe',
    icon: GraduationCap,
    tag: 'Gestão Educacional',
    title: 'SIPE',
    description:
      'Sistema Integrado Provincial da Educação, desenvolvido para otimizar a gestão educacional a nivel provincial, permitindo o gerenciamento eficiente de informações e processos educacionais e promoção da qualidade do ensino.',
    stack: ['Laravel', 'React', 'Inertia.js', 'MySQL'],
  },
  {
    slug: 'turismo-angola',
    icon: Compass,
    tag: 'Turismo',
    title: 'Plataforma de Turismo de Angola',
    description:
      'Registo de atrações turísticas em formulário multi-etapas, chat em tempo real entre turistas e negócios, navegação com mapas (OpenStreetMap + Leaflet) e o assistente virtual "Kamba", alimentado por IA generativa.',
    stack: ['React', 'TypeScript', 'Fastify', 'Prisma'],
  },
  {
    slug: 'acesso-etp',
    icon: Landmark,
    tag: 'Serviço Público',
    title: 'Acesso ETP',
    description:
      'Plataforma governamental de admissão ao Ensino Técnico-Profissional. Redesenho da página de consulta de resultados com foco em clareza, confiança institucional e forte responsividade móvel e desktop.',
    stack: ['Laravel', 'Blade/React', 'MySQL'],
  },
]
