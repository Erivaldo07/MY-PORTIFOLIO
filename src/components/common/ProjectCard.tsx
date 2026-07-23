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
    <Card className="border-border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon size={18} className="text-primary" strokeWidth={1.6} />
        </div>
        <span className="font-mono text-[11px] uppercase text-[#D9A85C]">{tag}</span>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2 text-lg text-foreground">{title}</CardTitle>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground"
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
