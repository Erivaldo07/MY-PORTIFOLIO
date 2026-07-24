import { Braces, Server, Database, Layers, type LucideIcon, Sparkles, Cpu, Gauge } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

type Node = {
  label: string
  sub: string
  icon: LucideIcon
  x: number
  color: string
  status: 'active' | 'idle' | 'warning'
  pulseDelay: number
  metrics: {
    requests: number
    latency: string
    uptime: string
  }
}

const nodes: Node[] = [
  {
    label: 'Frontend',
    sub: 'React · TS · Tailwind',
    icon: Braces,
    x: 40,
    color: '#8B5CF6',
    status: 'active',
    pulseDelay: 0,
    metrics: {
      requests: 1247,
      latency: '45ms',
      uptime: '99.9%'
    }
  },
  {
    label: 'API Gateway',
    sub: 'Laravel · Fastify',
    icon: Server,
    x: 220,
    color: '#EC4899',
    status: 'active',
    pulseDelay: 0.8,
    metrics: {
      requests: 983,
      latency: '120ms',
      uptime: '99.7%'
    }
  },
  {
    label: 'Database',
    sub: 'MySQL · Prisma',
    icon: Database,
    x: 400,
    color: '#06B6D4',
    status: 'active',
    pulseDelay: 1.6,
    metrics: {
      requests: 2156,
      latency: '28ms',
      uptime: '99.95%'
    }
  },
  {
    label: 'Real-time',
    sub: 'WebSocket · SSE',
    icon: Layers,
    x: 580,
    color: '#F59E0B',
    status: 'warning',
    pulseDelay: 2.4,
    metrics: {
      requests: 567,
      latency: '89ms',
      uptime: '98.5%'
    }
  },
]

function ArchitecturePulse() {
  const [activeNodes, setActiveNodes] = useState<number[]>([])
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const [dataFlow, setDataFlow] = useState<{ from: number; to: number }[]>([])
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Simula tráfego de dados mais complexo
    const interval = setInterval(() => {
      const from = Math.floor(Math.random() * nodes.length)
      let to = Math.floor(Math.random() * nodes.length)
      while (to === from) to = Math.floor(Math.random() * nodes.length)

      setActiveNodes(prev => {
        const newActive = [...prev, from, to]
        if (newActive.length > 4) newActive.splice(0, newActive.length - 4)
        return newActive
      })

      setDataFlow(prev => {
        const newFlow = [...prev, { from, to }]
        if (newFlow.length > 3) newFlow.shift()
        return newFlow
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'var(--primary)'
      case 'warning': return '#F59E0B'
      case 'idle': return 'var(--muted-foreground)'
      default: return 'var(--primary)'
    }
  }

  const getStatusGlow = (status: string) => {
    switch (status) {
      case 'active': return 'rgba(34, 197, 94, 0.3)'
      case 'warning': return 'rgba(245, 158, 11, 0.3)'
      case 'idle': return 'rgba(100, 116, 139, 0.2)'
      default: return 'rgba(34, 197, 94, 0.3)'
    }
  }

  return (
    <div className="w-full glass-card p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:shadow-xl">
      {/* Header com métricas */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-linear-to-br from-primary/20 to-primary/5">
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div>
            <span className="text-sm sm:text-base font-semibold">Arquitetura do Sistema</span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-muted-foreground">Operacional</span>
              </div>
              <div className="w-px h-3 bg-border" />
              <div className="flex items-center gap-1">
                <Gauge className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">99.8% uptime</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {nodes.filter(n => n.status === 'active').length} ativos
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            {nodes.filter(n => n.status === 'warning').length} avisos
          </span>
          <Sparkles className="w-3 h-3 text-primary" />
        </div>
      </div>

      {/* SVG com responsividade melhorada */}
      <div className="w-full overflow-x-auto -mx-2 sm:mx-0">
        <svg
          ref={svgRef}
          viewBox="0 0 700 220"
          className="h-auto w-full min-w-125 sm:min-w-150"
        >
          <defs>
            {/* Gradientes das linhas */}
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="lineGradActive" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2">
                <animate attributeName="stop-opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.8">
                <animate attributeName="stop-opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2">
                <animate attributeName="stop-opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            {/* Filtros */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="glowStrong">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
            </filter>

            <filter id="shadowHover">
              <feDropShadow dx="0" dy="6" stdDeviation="12" floodOpacity="0.25"/>
            </filter>

            {/* Glow dos nós */}
            {nodes.map((n, idx) => (
              <radialGradient
                key={`nodeGlow-${idx}`}
                id={`nodeGlow-${idx}`}
                cx="50%"
                cy="50%"
                r="50%"
              >
                <stop offset="0%" stopColor={n.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={n.color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {/* Background com gradiente suave */}
          <rect x="0" y="20" width="700" height="160" rx="12" fill="var(--muted)" opacity="0.05" />

          {/* Glows dos nós */}
          {nodes.map((n, idx) => (
            <circle
              key={`glow-${idx}`}
              cx={n.x + 38}
              cy={70}
              r="60"
              fill={`url(#nodeGlow-${idx})`}
              opacity="0.5"
            >
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur={`${3 + idx}s`} repeatCount="indefinite" />
              <animate attributeName="r" values="55;65;55" dur={`${3 + idx}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Linhas de conexão com gradiente */}
          <line
            x1="80"
            y1="70"
            x2="620"
            y2="70"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="6,6"
          />

          <line
            x1="80"
            y1="70"
            x2="620"
            y2="70"
            stroke="url(#lineGradActive)"
            strokeWidth="2"
          />

          {/* Partículas viajando com diferentes velocidades */}
          {[0, 1, 2, 3].map((i) => (
            <g key={`particle-${i}`}>
              <circle
                r="3"
                fill="var(--primary)"
                filter="url(#glow)"
              >
                <animateMotion
                  path="M80,70 L620,70"
                  dur={`${2.5 + i * 0.4}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.9}s`}
                />
                <animate attributeName="opacity" values="0;1;1;0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
              <circle
                r="6"
                fill="var(--primary)"
                opacity="0.2"
              >
                <animateMotion
                  path="M80,70 L620,70"
                  dur={`${2.5 + i * 0.4}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.9}s`}
                />
                <animate attributeName="opacity" values="0;0.2;0.2;0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          {/* Conexões dinâmicas de dados */}
          {dataFlow.map((flow, idx) => {
            const fromNode = nodes[flow.from]
            const toNode = nodes[flow.to]
            const midX = (fromNode.x + toNode.x) / 2 + 38

            return (
              <g key={`flow-${idx}`}>
                <line
                  x1={fromNode.x + 38}
                  y1={70}
                  x2={toNode.x + 38}
                  y2={70}
                  stroke={fromNode.color}
                  strokeWidth="1.5"
                  opacity="0.3"
                  strokeDasharray="3,3"
                >
                  <animate attributeName="opacity" values="0;0.5;0" dur="1s" repeatCount="indefinite" />
                </line>
                <circle
                  r="3"
                  fill={fromNode.color}
                  filter="url(#glow)"
                >
                  <animateMotion
                    path={`M${fromNode.x + 38},70 L${toNode.x + 38},70`}
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" />
                </circle>
              </g>
            )
          })}

          {/* Nós com design aprimorado */}
          {nodes.map((n, idx) => {
            const isActive = activeNodes.includes(idx)
            const isHovered = hoveredNode === idx
            const statusColor = getStatusColor(n.status)
            const statusGlow = getStatusGlow(n.status)

            return (
              <g
                key={n.label}
                transform={`translate(${n.x}, 20)`}
                onMouseEnter={() => setHoveredNode(idx)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Efeito de hover mais elaborado */}
                {isHovered && (
                  <>
                    <circle
                      cx="38"
                      cy="50"
                      r="70"
                      fill={n.color}
                      opacity="0.05"
                    />
                    <circle
                      cx="38"
                      cy="50"
                      r="55"
                      fill="none"
                      stroke={n.color}
                      strokeWidth="1"
                      opacity="0.2"
                      strokeDasharray="4,4"
                    >
                      <animate attributeName="r" values="50;60;50" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.1;0.3;0.1" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {/* Glow do nó ativo com animação mais complexa */}
                {isActive && (
                  <>
                    <circle
                      cx="38"
                      cy="50"
                      r="45"
                      fill={statusGlow}
                    >
                      <animate attributeName="r" values="35;55;35" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle
                      cx="38"
                      cy="50"
                      r="30"
                      fill="none"
                      stroke={statusColor}
                      strokeWidth="0.5"
                      opacity="0.3"
                    >
                      <animate attributeName="r" values="25;40;25" dur="1.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.1;0.4;0.1" dur="1.2s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {/* Container do nó com design 3D */}
                <rect
                  x="-6"
                  y="6"
                  width="88"
                  height="88"
                  rx="18"
                  fill="var(--card)"
                  stroke={isHovered ? statusColor : 'var(--border)'}
                  strokeWidth={isHovered ? 2 : 1}
                  filter={isHovered ? "url(#shadowHover)" : "url(#shadow)"}
                  style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
                <rect
                  x="-4"
                  y="8"
                  width="84"
                  height="84"
                  rx="16"
                  fill="var(--card)"
                  opacity="0.5"
                />

                {/* Ícone com animação de rotação sutil */}
                <foreignObject x="6" y="10" width="76" height="76">
                  <div className="flex h-full w-full items-center justify-center">
                    <div className={`transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : 'scale-100'}`}>
                      <n.icon
                        size={30}
                        className="transition-all duration-300"
                        style={{
                          color: isHovered ? statusColor : 'var(--foreground)',
                          filter: isHovered ? `drop-shadow(0 0 8px ${statusColor})` : 'none'
                        }}
                        strokeWidth={isHovered ? 1.8 : 1.5}
                      />
                    </div>
                  </div>
                </foreignObject>

                {/* Indicador de status animado */}
                <circle
                  cx="78"
                  cy="14"
                  r="6"
                  fill={statusColor}
                  filter="url(#glow)"
                >
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle
                  cx="78"
                  cy="14"
                  r="8"
                  fill="none"
                  stroke={statusColor}
                  strokeWidth="1"
                  opacity="0.3"
                >
                  <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Métricas em tooltip visual */}
                {isHovered && (
                  <g transform="translate(-20, 108)">
                    <rect
                      x="0"
                      y="-4"
                      width="116"
                      height="42"
                      rx="8"
                      fill="var(--card)"
                      stroke="var(--border)"
                      strokeWidth="1"
                      filter="url(#shadow)"
                    />
                    <text x="8" y="10" fill="var(--muted-foreground)" fontSize="8" fontFamily="monospace">
                      <tspan>Req: </tspan>
                      <tspan fill="var(--foreground)">{n.metrics.requests}</tspan>
                    </text>
                    <text x="58" y="10" fill="var(--muted-foreground)" fontSize="8" fontFamily="monospace">
                      <tspan>Lat: </tspan>
                      <tspan fill="var(--foreground)">{n.metrics.latency}</tspan>
                    </text>
                    <text x="8" y="26" fill="var(--muted-foreground)" fontSize="8" fontFamily="monospace">
                      <tspan>Uptime: </tspan>
                      <tspan fill="var(--foreground)">{n.metrics.uptime}</tspan>
                    </text>
                    <text x="58" y="26" fill="var(--muted-foreground)" fontSize="8" fontFamily="monospace">
                      <tspan>Status: </tspan>
                      <tspan fill={statusColor}>{n.status.toUpperCase()}</tspan>
                    </text>
                  </g>
                )}

                {/* Label com sombra */}
                <text
                  x="38"
                  y="110"
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize={isHovered ? "14" : "13"}
                  fontWeight={600}
                  className="select-none transition-all duration-300"
                  style={{
                    textShadow: isHovered ? `0 0 20px ${statusColor}40` : 'none'
                  }}
                >
                  {n.label}
                </text>

                {/* Sub-label com fade */}
                <text
                  x="38"
                  y="126"
                  textAnchor="middle"
                  fill="var(--muted-foreground)"
                  fontSize="9"
                  className="select-none"
                  opacity={isHovered ? 1 : 0.7}
                >
                  {n.sub}
                </text>
              </g>
            )
          })}

          {/* Footer com estatísticas animadas */}
          <g transform="translate(20, 180)">
            <rect x="0" y="-6" width="660" height="28" rx="6" fill="var(--muted)" opacity="0.05" />
            <text x="20" y="12" fill="var(--muted-foreground)" fontSize="9" className="select-none">
              <tspan>⚡ </tspan>
              <tspan fill="var(--foreground)">{Math.floor(Math.random() * 100 + 900)}</tspan>
              <tspan> req/s  •  </tspan>
              <tspan fill="var(--foreground)">{Math.floor(Math.random() * 20 + 40)}ms</tspan>
              <tspan> média  •  </tspan>
              <tspan fill="var(--foreground)">99.8%</tspan>
              <tspan> disponibilidade</tspan>
            </text>

            <text x="640" y="12" fill="var(--muted-foreground)" fontSize="9" textAnchor="end" className="select-none">
              <tspan>🔄 </tspan>
              <tspan fill="var(--primary)">sincronizado</tspan>
            </text>
          </g>
        </svg>
      </div>

      {/* Indicadores mobile */}
      <div className="flex sm:hidden items-center justify-center gap-4 mt-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Ativo
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          Aviso
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
          Inativo
        </span>
      </div>
    </div>
  )
}

export default ArchitecturePulse
