import { GraduationCap, Compass, Stethoscope, Landmark, type LucideIcon } from 'lucide-react'

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
      'Sistema de gestão académica e de secretaria para municípios e comunas, com módulos de matrícula, turmas e relatórios. Arquitetura com BaseController reutilizável e templates de CRUD paginado no frontend.',
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
    slug: 'plataforma-hospitalar',
    icon: Stethoscope,
    tag: 'Saúde',
    title: 'Plataforma Hospitalar',
    description:
      'Sistema de consulta e triagem com chat clínico em tempo real via WebSocket, autenticação segura e sincronização de sessão entre paciente e profissional de saúde.',
    stack: ['React', 'TypeScript', 'Fastify', 'Prisma', 'MySQL'],
  },
  {
    slug: 'acesso-etp',
    icon: Landmark,
    tag: 'Serviço Público',
    title: 'Acesso ETP',
    description:
      'Plataforma governamental de admissão ao Ensino Técnico-Profissional. Redesenho da página de consulta de resultados com foco em clareza, confiança institucional e forte responsividade móvel.',
    stack: ['Laravel', 'Blade/React', 'MySQL'],
  },
]
