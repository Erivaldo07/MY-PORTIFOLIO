import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { LucideIcon } from 'lucide-react'

type ProjectCardProps = {
  icon: LucideIcon
  tag: string
  title: string
  description: string
  stack: string[]
}

function ProjectCard({ icon: Icon, tag, title, description, stack }: ProjectCardProps) {
  return (
    <Card className="border-[#1F3B54] bg-[#112436] transition-colors hover:border-[#2E9CB3]/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#15304A]">
          <Icon size={18} className="text-[#2E9CB3]" strokeWidth={1.6} />
        </div>
        <span className="font-mono text-[11px] uppercase text-[#D9A85C]">{tag}</span>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2 text-lg text-[#EAF2F6]">{title}</CardTitle>
        <p className="mb-4 text-sm leading-relaxed text-[#8FA9BC]">{description}</p>
        <div className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-[#1F3B54] px-2 py-1 font-mono text-[11px] text-[#8FA9BC]"
            >
              {s}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
