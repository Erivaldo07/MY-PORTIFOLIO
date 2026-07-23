import { Braces, Server, Database, GitBranch, type LucideIcon } from 'lucide-react'

export type SkillGroup = {
  title: string
  icon: LucideIcon
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { title: 'Frontend', icon: Braces, items: ['React', 'TypeScript', 'Tailwind CSS', 'Inertia.js'] },
  { title: 'Backend', icon: Server, items: ['Laravel (PHP)', 'Node.js', 'Fastify'] },
  { title: 'Dados', icon: Database, items: ['MySQL', 'Prisma ORM'] },
  {
    title: 'Ferramentas & Extras',
    icon: GitBranch,
    items: ['Git & Git-flow', 'WebSockets / Socket.IO', 'Leaflet / OpenStreetMap', 'Integração com APIs de IA'],
  },
]
