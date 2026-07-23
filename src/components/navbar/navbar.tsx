import { NavLink } from 'react-router-dom'
import { Code2 } from 'lucide-react'
import ThemeToggle from '@/components/common/ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/contacto', label: 'Contacto' },
]

function Navbar() {
  return (
    <header className="border-b border-border px-6 py-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <span className="flex items-center gap-2 font-semibold text-foreground">
          <Code2 size={18} className="text-primary" />
          EM.
        </span>

        <div className="flex items-center gap-6">
          <div className="flex gap-6 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
