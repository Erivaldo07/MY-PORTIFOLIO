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
  views?: number
  category?: string
}

export const projects: Project[] = [
  {
    slug: 'sipe',
    icon: GraduationCap,
    tag: 'Gestão Educacional',
    title: 'SIPE',
    liveUrl: 'https://luanda.sipe.ao/',
    description:
      'Sistema Integrado Provincial da Educação, desenvolvido para otimizar a gestão educacional a nivel provincial, permitindo o gerenciamento eficiente de informações e processos educacionais e promoção da qualidade do ensino.',
    stack: ['Laravel', 'React', 'Inertia.js', 'MySQL'],
  },
  {
    slug: 'Portal do Ipil',
    icon: Compass,
    tag: 'Gestão Acadêmica',
    title: 'Plataforma de gestão academica',
    liveUrl: 'https://portal.ipil.ao/login',
    description:
      'Plataforma de gestão academica do Instituto Politécnico Industrial de Luanda, capaz de gerenciar informações e processos educacionais, melhorando a eficiência operacional e a qualidade do ensino .',
    stack: ['React', 'TypeScript', 'Fastify', 'Prisma'],
  },
  {
    slug: 'acesso-etp',
    icon: Landmark,
    tag: 'Serviço Público',
    title: 'Acesso ETP',
    liveUrl: 'https://acessoetp.ao/?fbclid=IwcGRvZgRleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8yNzUyNTQ2OTI1OTgyNzkAAR6zilqmYm5C5avqnV2c7fpJf72mkHBSUBZpbVzuoGF0FKDK6R-4qvrCh9vDew_aem_ifmM5GDAj9HQ_H6r8qQVwg',
    description:
      'Plataforma governamental de admissão ao Ensino Técnico-Profissional. Redesenho da página de consulta de resultados com foco em clareza, confiança institucional e forte responsividade móvel e desktop.',
    stack: ['Laravel', 'Blade/React', 'MySQL'],
  },
]
