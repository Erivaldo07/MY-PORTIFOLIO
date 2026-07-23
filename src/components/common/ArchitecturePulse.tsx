import { Braces, Server, Database, Layers, type LucideIcon } from 'lucide-react'

type Node = {
  label: string
  sub: string
  icon: LucideIcon
  x: number
}

const nodes: Node[] = [
  { label: 'Frontend', sub: 'React · TS · Tailwind', icon: Braces, x: 40 },
  { label: 'API', sub: 'Laravel · Fastify', icon: Server, x: 220 },
  { label: 'Dados', sub: 'MySQL · Prisma', icon: Database, x: 400 },
  { label: 'Tempo-real', sub: 'WebSocket', icon: Layers, x: 580 },
]

function ArchitecturePulse() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 660 160" className="h-auto w-full min-w-140 font-mono">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2E9CB3" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#2E9CB3" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2E9CB3" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <line x1="70" y1="70" x2="610" y2="70" stroke="url(#lineGrad)" strokeWidth="1.5" />

        <circle r="4" fill="#D9A85C">
          <animateMotion path="M70,70 L610,70" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" repeatCount="indefinite" />
        </circle>

        {nodes.map((n) => (
          <g key={n.label} transform={`translate(${n.x}, 30)`}>
            <rect x="-38" y="-8" width="76" height="76" rx="14" fill="#112436" stroke="#1F3B54" strokeWidth="1" />
            <foreignObject x="-38" y="-8" width="76" height="76">
              <div className="flex h-full w-full items-center justify-center">
                <n.icon size={22} color="#2E9CB3" strokeWidth={1.6} />
              </div>
            </foreignObject>
            <text x="0" y="92" textAnchor="middle" fill="#EAF2F6" fontSize="12" fontWeight={500}>
              {n.label}
            </text>
            <text x="0" y="108" textAnchor="middle" fill="#8FA9BC" fontSize="9">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default ArchitecturePulse
